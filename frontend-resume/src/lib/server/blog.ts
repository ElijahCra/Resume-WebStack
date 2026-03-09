import type {BlogPost, BlogPostFrontmatter, BlogPostWithComponent} from '$lib/types/blog';
import {error} from '@sveltejs/kit';

/**
 * Get all blog posts from src/content/blog/
 * Uses Vite's import.meta.glob for filesystem access
 */
export async function getAllPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob<{
		metadata: BlogPostFrontmatter;
	}>('/src/content/blog/*.svx', { eager: true });

	const posts: BlogPost[] = [];

	for (const [filepath, module] of Object.entries(modules)) {
		const slug = extractSlugFromPath(filepath);

		if (module.metadata) {
			posts.push({
				slug,
				frontmatter: module.metadata
			});
		}
	}

	return posts;
}

/**
 * Get only published posts, sorted by date (newest first)
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
	const allPosts = await getAllPosts();

	return allPosts
		.filter((post) => post.frontmatter.published)
		.sort((a, b) => {
			const dateA = new Date(a.frontmatter.date);
			const dateB = new Date(b.frontmatter.date);
			return dateB.getTime() - dateA.getTime();
		});
}

/**
 * Get a single post by slug with its Svelte component
 */
export async function getPostBySlug(slug: string): Promise<BlogPostWithComponent> {
	const modules = import.meta.glob<{
		metadata: BlogPostFrontmatter;
		default: any;
	}>('/src/content/blog/*.svx');

	const path = `/src/content/blog/${slug}.svx`;

	if (!modules[path]) {
		throw error(404, `Post "${slug}" not found`);
	}

	const module = await modules[path]();

	if (!module.metadata) {
		throw error(500, `Post "${slug}" missing frontmatter metadata`);
	}

	if (!module.metadata.published) {
		throw error(404, `Post "${slug}" is not published`);
	}

	return {
		slug,
		frontmatter: module.metadata,
		component: module.default
	};
}

/**
 * Extract slug from filepath
 * Example: '/src/content/blog/my-post.svx' -> 'my-post'
 */
function extractSlugFromPath(filepath: string): string {
	return filepath.split('/').pop()!.replace('.svx', '');
}

/**
 * Get related posts by matching tags/categories
 */
export async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
	const allPosts = await getPublishedPosts();
	const currentPost = allPosts.find((p) => p.slug === currentSlug);

	if (!currentPost) return [];

	return allPosts
		.filter((p) => p.slug !== currentSlug)
		.map((post) => {
			let score = 0;

			// Score based on matching tags
			const matchingTags = post.frontmatter.tags.filter((tag) =>
				currentPost.frontmatter.tags.includes(tag)
			);
			score += matchingTags.length * 2;

			// Score based on matching categories
			const matchingCategories = post.frontmatter.categories.filter((cat) =>
				currentPost.frontmatter.categories.includes(cat)
			);
			score += matchingCategories.length * 3;

			return {post, score};
		})
		.filter(({score}) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(({post}) => post);
}
