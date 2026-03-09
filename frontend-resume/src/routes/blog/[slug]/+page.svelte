<script lang="ts">
	import type { PageData } from './$types';
	import BlogCard from '$lib/components/BlogCard.svelte';

	let { data }: { data: PageData } = $props();

	const formattedDate = $derived(() => {
		const date = new Date(data.post.frontmatter.date);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	const PostComponent = $derived(data.post.component);
</script>

<svelte:head>
	<title>{data.post.frontmatter.title} - Blog - elijahcrain.com</title>
	<meta name="description" content={data.post.frontmatter.description} />
	<meta name="author" content={data.post.frontmatter.author} />
	<meta property="og:title" content={data.post.frontmatter.title} />
	<meta property="og:description" content={data.post.frontmatter.description} />
	{#if data.post.frontmatter.coverImage}
		<meta property="og:image" content={data.post.frontmatter.coverImage} />
	{/if}
</svelte:head>

<article class="mx-auto max-w-4xl px-6 py-12">
	<!-- Article Header -->
	<header class="mb-12">
		{#if data.post.frontmatter.coverImage}
			<div class="mb-8 aspect-video overflow-hidden rounded-lg">
				<img
					src={data.post.frontmatter.coverImage}
					alt={data.post.frontmatter.title}
					class="h-full w-full object-cover"
				/>
			</div>
		{/if}

		<div class="mb-6 flex flex-wrap gap-2">
			{#each data.post.frontmatter.categories as category}
				<span
					class="inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200"
				>
					{category}
				</span>
			{/each}
		</div>

		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
			{data.post.frontmatter.title}
		</h1>

		<p class="mb-6 text-xl text-gray-600 dark:text-gray-400">
			{data.post.frontmatter.description}
		</p>

		<div class="flex items-center gap-4 text-gray-600 dark:text-gray-400">
			<span class="font-medium">{data.post.frontmatter.author}</span>
			<span>•</span>
			<time datetime={data.post.frontmatter.date}>
				{formattedDate()}
			</time>
		</div>

		<div class="mt-4 flex flex-wrap gap-2">
			{#each data.post.frontmatter.tags as tag}
				<span class="inline-block rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
					#{tag}
				</span>
			{/each}
		</div>
	</header>

	<!-- Article Content with Typography Plugin -->
	<div
		class="prose prose-lg prose-slate max-w-none
		prose-headings:font-bold prose-headings:text-gray-900
		prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
		prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:text-pink-600
		prose-pre:bg-gray-900 prose-pre:text-gray-100
		prose-img:rounded-lg prose-img:shadow-lg
		dark:prose-headings:text-gray-100
		dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
		dark:prose-code:bg-gray-800 dark:prose-code:text-pink-400
		dark:prose-pre:bg-gray-950
		dark:prose-strong:text-gray-200
		dark:text-gray-300"
	>
		<PostComponent />
	</div>

	<!-- Back to Blog Link -->
	<div class="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
		<a
			href="/blog"
			class="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
		>
			<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Back to Blog
		</a>
	</div>
</article>

<!-- Related Posts Section -->
{#if data.relatedPosts && data.relatedPosts.length > 0}
	<section class="mx-auto max-w-7xl bg-gray-50 px-6 py-12 dark:bg-gray-900">
		<h2 class="mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100">Related Posts</h2>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.relatedPosts as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	</section>
{/if}
