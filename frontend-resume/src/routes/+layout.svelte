<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import PageVisit from '$lib/components/PageVisit/PageVisit.svelte';


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

<nav class="fixed top-0 left-0 right-0 bg-surface-alt shadow-md shadow-nav-shadow nav-height">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<a href="/" class="text-xl font-bold text-heading transition-colors hover:text-body">
			elijahcrain.com
		</a>

		<div class="flex items-center gap-6">
			<a
				href="/"
				class="text-link font-medium transition-colors hover:text-accent {page.url.pathname === '/' ? 'text-accent border-b-2 border-accent' : ''}"
			>
				Home
			</a>
			<a
				href="/blog"
				class="text-link font-medium transition-colors hover:text-accent {page.url.pathname.startsWith('/blog') ? 'text-accent border-b-2 border-accent' : ''}"
			>
				Blog
			</a>
			<a
				href="/resume"
				class="text-link font-medium transition-colors hover:text-accent {page.url.pathname === '/resume' ? 'text-accent border-b-2 border-accent' : ''}"
			>
				Resume
			</a>

			<!-- Theme Toggle -->
			<div class="flex gap-2 rounded-lg p-1">
				<button
					onclick={() => theme.setTheme('light')}
					class="rounded-md bg-toggle-light-bg p-2 transition-all {$theme === 'light'
						? 'ring-2 ring-toggle-light-ring ring-offset-2'
						: ''}"
					aria-label="Light mode"
				>
					<svg class="h-5 w-5 stroke-toggle-light-icon" fill="none" viewBox="0 0 24 24">
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
					class="rounded-md bg-toggle-dark-bg p-2 transition-all {$theme === 'dark'
						? 'ring-2 ring-toggle-dark-ring ring-offset-2'
						: ''}"
					aria-label="Dark mode"
				>
					<svg class="h-5 w-5 stroke-toggle-dark-icon" fill="none" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
						/>
					</svg>
				</button>
			</div>
			<PageVisit />
		</div>
	</div>
</nav>

<div class="bg-surface min-h-screen-adjusted">
	{@render children()}
</div>
