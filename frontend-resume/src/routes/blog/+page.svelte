<script lang="ts">
	import type { PageData } from './$types';
	import BlogCard from '$lib/components/BlogCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog - elijahcrain.com</title>
	<meta
		name="description"
		content="Read the latest articles and insights on web development, programming, and technology."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-12">
	<header class="mb-12">
		<h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Blog</h1>
		<p class="text-lg text-gray-600 dark:text-gray-400">
			{data.totalCount}
			{data.totalCount === 1 ? 'post' : 'posts'} published
		</p>
	</header>

	{#if data.posts.length === 0}
		<div class="py-12 text-center">
			<p class="text-xl text-gray-500 dark:text-gray-400">No posts published yet. Check back soon!</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.posts as post (post.slug)}
				<BlogCard {post} />
			{/each}
		</div>
	{/if}
</div>
