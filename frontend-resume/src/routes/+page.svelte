<script lang="ts">
	import BlogCardSmall from '$lib/components/BlogCardSmall.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex min-h-screen-adjusted flex-col items-center gap-8 p-8">
	{#if data.recentPosts.length > 0}
		<section class="w-full max-w-5xl">
			<h2 class="mb-6 text-2xl font-bold text-heading">Recent Posts</h2>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.recentPosts as post (post.slug)}
					<BlogCardSmall {post} />
				{/each}
			</div>
			<div class="mt-6 flex gap-4">
				<a
					href="/blog"
					class="flex flex-1 items-center justify-between rounded-lg border border-border px-5 py-4 transition-colors hover:bg-surface-hover"
				>
					<span class="font-semibold text-heading">All Posts</span>
					<span class="text-muted">→</span>
				</a>
				<a
					href="/resume"
					class="flex flex-1 items-center justify-between rounded-lg border border-border px-5 py-4 transition-colors hover:bg-surface-hover"
				>
					<span class="font-semibold text-heading">Resume</span>
					<span class="text-muted">→</span>
				</a>
			</div>
		</section>
	{/if}


</div>
