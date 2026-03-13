<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';

	interface Props {
		post: BlogPost;
	}

	let { post }: Props = $props();

	const thumbnail = $derived(
		post.frontmatter.thumbnail ||
			post.frontmatter.coverImage ||
			'/blog-images/placeholder.jpg'
	);
</script>

<article
	class="group overflow-hidden rounded-lg border border-separator bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-lg"
>
	<a href="/blog/{post.slug}" class="flex flex-col">
		<div class="aspect-video overflow-hidden bg-placeholder">
			<img
				src={thumbnail}
				alt={post.frontmatter.title}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</div>

		<div class="p-3">
			<h3
				class="mb-2 line-clamp-1 text-sm font-semibold text-heading transition-colors group-hover:text-accent"
			>
				{post.frontmatter.title}
			</h3>

			<div class="flex flex-wrap gap-1">
				{#each post.frontmatter.tags.slice(0, 3) as tag}
					<span
						class="inline-block rounded-full bg-tag-bg px-2 py-0.5 text-[0.65rem] font-medium text-tag-text"
					>
						{tag}
					</span>
				{/each}
			</div>
		</div>
	</a>
</article>
