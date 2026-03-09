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
	class="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
>
	<a href="/blog/{post.slug}" class="block">
		<div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
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
						class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
					>
						{tag}
					</span>
				{/each}
			</div>

			<h2
				class="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400"
			>
				{post.frontmatter.title}
			</h2>

			<p class="mb-4 flex-1 line-clamp-3 text-gray-600 dark:text-gray-400">
				{post.frontmatter.description}
			</p>

			<div
				class="flex items-center justify-between border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400"
			>
				<span class="font-medium">{post.frontmatter.author}</span>
				<time datetime={post.frontmatter.date}>
					{formattedDate()}
				</time>
			</div>
		</div>
	</a>
</article>
