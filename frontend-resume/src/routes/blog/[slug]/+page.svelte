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
					class="inline-block rounded-full bg-category-bg px-4 py-1 text-sm font-medium text-category-text"
				>
					{category}
				</span>
			{/each}
		</div>

		<h1 class="mb-4 text-4xl font-bold text-heading md:text-5xl">
			{data.post.frontmatter.title}
		</h1>

		<p class="mb-6 text-xl text-body">
			{data.post.frontmatter.description}
		</p>

		<div class="flex items-center gap-4 text-body">
			<span class="font-medium">{data.post.frontmatter.author}</span>
			<span>•</span>
			<time datetime={data.post.frontmatter.date}>
				{formattedDate()}
			</time>
		</div>

		<div class="mt-4 flex flex-wrap gap-2">
			{#each data.post.frontmatter.tags as tag}
				<span class="inline-block rounded bg-badge-bg px-3 py-1 text-sm text-badge-text">
					#{tag}
				</span>
			{/each}
		</div>
	</header>

	<!-- Article Content with Typography Plugin -->
	<div
		class="prose prose-lg max-w-none
		prose-headings:font-bold
		prose-a:no-underline hover:prose-a:underline
		prose-img:rounded-lg prose-img:shadow-lg"
	>
		<PostComponent />
	</div>

	<!-- Back to Blog Link -->
	<div class="mt-12 border-t border-separator pt-8">
		<a
			href="/blog"
			class="inline-flex items-center font-medium text-accent transition-colors hover:text-accent-hover"
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
	<section class="mx-auto max-w-7xl bg-surface px-6 py-12">
		<h2 class="mb-8 text-3xl font-bold text-heading">Related Posts</h2>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.relatedPosts as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	</section>
{/if}
