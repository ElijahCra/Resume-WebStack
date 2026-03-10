<script lang="ts">
	import '../../../routes/layout.css';
	import AboutMe from '$lib/components/Articles/AboutMe.svelte';
	import ContactInformation from '$lib/components/Articles/ContactInformation.svelte';
	import Skills from '$lib/components/Articles/Skills.svelte';
	import Professional from '$lib/components/Articles/Professional.svelte';
	import Achievements from '$lib/components/Articles/Achievements.svelte';
	import AdditionalInfo from '$lib/components/Articles/AdditionalInfo.svelte';
	import Header from "$lib/components/Header/Header.svelte";
</script>

<div class="print-page">
	<div class="mx-auto px-4">
		<div class="container">
			<div class="mt-4 grid grid-cols-2 gap-4">
				<AboutMe />
				<ContactInformation />
			</div>

			<div class="mt-4">
				<Skills />
			</div>

			<div class="mt-4">
				<Professional />
			</div>

			<div class="mt-4">
				<Achievements />
			</div>

			<div class="mt-4">
				<AdditionalInfo />
			</div>
		</div>
	</div>
</div>

<style>
	:global(html) {
		background-color: #ffffff !important;
		color: #111827 !important;
	}

	:global(body) {
		background-color: #ffffff !important;
		color: #111827 !important;
	}

	/* Hide root layout nav and remove its top padding */
	:global(nav) {
		display: none !important;
	}

	.print-page {
		background-color: #ffffff;
		color: #111827;
		font-size: 12px;
		line-height: 1.4;
	}

	/* Compact spacing */
	.print-page :global(.mt-10) {
		margin-top: 0.75rem;
	}

	.print-page :global(.mt-12) {
		margin-top: 0.75rem;
	}

	.print-page :global(.gap-6) {
		gap: 0.5rem;
	}

	.print-page :global(.py-6) {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	.print-page :global(.mb-6) {
		margin-bottom: 0.25rem;
	}

	/* Compact headings */
	.print-page :global(h1) {
		font-size: 1.5rem;
	}

	.print-page :global(h2) {
		font-size: 1.15rem;
	}

	.print-page :global(h3) {
		font-size: 0.95rem;
	}

	.print-page :global(h4) {
		font-size: 0.85rem;
	}

	/* Compact prose */
	.print-page :global(.prose) {
		font-size: 0.8rem;
		line-height: 1.35;
	}

	.print-page :global(.prose p) {
		margin-bottom: 0.15rem;
	}

	.print-page :global(.prose ul) {
		margin-top: 0.15rem;
		margin-bottom: 0.15rem;
		padding-left: 1.2rem;
	}

	.print-page :global(.prose li) {
		margin-top: 0.1rem;
		margin-bottom: 0.1rem;
	}

	/* Force skills grid to row layout */
	.print-page :global(.grid-flow-row) {
		grid-auto-flow: column !important;
	}

	@page {
		size: Letter;
		margin: 0.4in;
	}

	@media print {
		:global(*) {
			break-inside: avoid;
		}

		.print-page {
			padding: 0;
			margin: 0;
		}
	}
</style>
