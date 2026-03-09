<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();

	// Initialize theme on mount
	onMount(() => {
		if (!browser) return;

		// Get initial theme (default to light)
		const stored = localStorage.getItem('theme');
		const initialTheme = stored || 'light';

		// Sync store with current theme
		if (initialTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// Set theme in store (this won't reapply the class, just syncs the state)
		theme.setTheme(initialTheme as 'light' | 'dark');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="fixed top-0 left-0 right-0 bg-surface-alternate shadow-md nav-height dark:shadow-gray-900/30">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href="/" class="text-xl font-bold text-link-muted transition-colors">
			elijahcrain.com
		</a>

		<div class="flex items-center gap-6">
			<a
				href="/"
				class="text-link font-medium transition-colors  {page.url.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : ''}"
			>
				Home
			</a>
			<a
				href="/blog"
				class="text-link font-medium transition-colors {page.url.pathname.startsWith('/blog') ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : ''}"
			>
				Blog
			</a>
			<a
				href="/resume"
				class="text-gray-700 font-medium transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 {page.url.pathname === '/resume' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : ''}"
			>
				Resume
			</a>

			<!-- Theme Toggle -->
			<div class="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
				<button
					onclick={() => theme.setTheme('light')}
					class="rounded-md p-2 transition-colors {$theme === 'light'
						? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
						: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}"
					aria-label="Light mode"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg>
				</button>
				<button
					onclick={() => theme.setTheme('dark')}
					class="rounded-md p-2 transition-colors {$theme === 'dark'
						? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400'
						: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'}"
					aria-label="Dark mode"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</nav>

<div class="bg-surface min-h-screen-adjusted">
	{@render children()}
</div>
