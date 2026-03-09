import type { PageLoad } from './$types';
import type { BlogPost, BlogPostFrontmatter } from '$lib/types/blog';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob<{
		metadata: BlogPostFrontmatter;
		default: any;
	}>('/src/content/blog/*.svx');

	const path = `/src/content/blog/${params.slug}.svx`;

	if (!modules[path]) {
		throw error(404, `Post "${params.slug}" not found`);
	}

	const module = await modules[path]();

	if (!module.metadata) {
		throw error(500, `Post "${params.slug}" missing frontmatter metadata`);
	}

	if (!module.metadata.published) {
		throw error(404, `Post "${params.slug}" is not published`);
	}

	// Load related posts
	const allModules = import.meta.glob<{
		metadata: BlogPostFrontmatter;
	}>('/src/content/blog/*.svx', { eager: true });

	const allPosts: BlogPost[] = [];
	for (const [filepath, mod] of Object.entries(allModules)) {
		if (mod.metadata && mod.metadata.published) {
			const slug = filepath.split('/').pop()!.replace('.svx', '');
			allPosts.push({
				slug,
				frontmatter: mod.metadata
			});
		}
	}

	// Calculate related posts
	const relatedPosts = allPosts
		.filter((p) => p.slug !== params.slug)
		.map((post) => {
			let score = 0;

			const matchingTags = post.frontmatter.tags.filter((tag) =>
				module.metadata.tags.includes(tag)
			);
			score += matchingTags.length * 2;

			const matchingCategories = post.frontmatter.categories.filter((cat) =>
				module.metadata.categories.includes(cat)
			);
			score += matchingCategories.length * 3;

			return { post, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, 3)
		.map(({ post }) => post);

	return {
		post: {
			slug: params.slug,
			frontmatter: module.metadata,
			component: module.default
		},
		relatedPosts
	};
};
