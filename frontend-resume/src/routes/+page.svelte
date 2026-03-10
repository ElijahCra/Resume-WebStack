<script>
	import PageVisit from '$lib/components/PageVisit/PageVisit.svelte';
</script>

<div class="flex h-screen-adjusted flex-col items-center justify-center gap-8 p-8">
	<div class="flex gap-8">
	<a
		href="/blog"
		class="group flex h-64 w-64 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-gray-400 dark:shadow-gray-700"
	>
		<span class="text-3xl font-bold text-heading transition-transform group-hover:scale-110">
			Blog
		</span>
	</a>

	<a
		href="/resume"
		class="group flex h-64 w-64 items-center justify-center rounded-lg bg-linear-to-br from-green-500 to-teal-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-gray-400 dark:shadow-gray-700"
	>
		<span class="text-3xl font-bold text-heading transition-transform group-hover:scale-110">
			Resume
		</span>
	</a>
	</div>
	<PageVisit />
</div>
