<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';

	interface Props {
		post: BlogPost;
	}

	let { post }: Props = $props();

	// Format date for display
	const formattedDate = $derived(() => {
		const date = new Date(post.frontmatter.date);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	// Get thumbnail or fallback to placeholder
	const thumbnail = $derived(
		post.frontmatter.thumbnail ||
			post.frontmatter.coverImage ||
			'/blog-images/placeholder.jpg'
	);
</script>

<article
	class="group flex h-full flex-col overflow-hidden rounded-lg border border-separator bg-card shadow-sm transition-all duration-300 hover:border-accent hover:shadow-xl"
>
	<a href="/blog/{post.slug}" class="block">
		<div class="aspect-video overflow-hidden bg-placeholder">
			<img
				src={thumbnail}
				alt={post.frontmatter.title}
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</div>

		<div class="flex flex-1 flex-col p-6">
			<div class="mb-3 flex flex-wrap gap-2">
				{#each post.frontmatter.tags.slice(0, 3) as tag}
					<span
						class="inline-block rounded-full bg-tag-bg px-3 py-1 text-xs font-medium text-tag-text"
					>
						{tag}
					</span>
				{/each}
			</div>

			<h2
				class="mb-2 line-clamp-2 text-xl font-bold text-heading transition-colors group-hover:text-accent"
			>
				{post.frontmatter.title}
			</h2>

			<p class="mb-4 flex-1 line-clamp-3 text-body">
				{post.frontmatter.description}
			</p>

			<div
				class="flex items-center justify-between border-t border-separator-light pt-4 text-sm text-muted"
			>
				<span class="font-medium">{post.frontmatter.author}</span>
				<time datetime={post.frontmatter.date}>
					{formattedDate()}
				</time>
			</div>
		</div>
	</a>
</article>
