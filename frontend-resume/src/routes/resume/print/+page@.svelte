<script lang="ts">
	import '../../../routes/layout.css';
	import AboutMe from '$lib/components/Articles/AboutMe.svelte';
	import ContactInformation from '$lib/components/Articles/ContactInformation.svelte';
	import Skills from '$lib/components/Articles/Skills.svelte';
	import Professional from '$lib/components/Articles/Professional.svelte';
	import Achievements from '$lib/components/Articles/Achievements.svelte';
	import AdditionalInfo from '$lib/components/Articles/AdditionalInfo.svelte';
</script>

<div class="print-page">
	<div class="mx-auto max-w-8/10 px-6 mt-12">
		<div class="container">
			<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
				<AboutMe />
				<div class="flex justify-center">
					<ContactInformation />
				</div>
			</div>

			<div class="mt-10">
				<Skills />
			</div>

			<div class="mt-10">
				<Professional />
			</div>

			<div class="mt-10">
				<Achievements />
			</div>

			<div class="mt-10">
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
	}

	@page {
		size: Letter;
		margin: 0.5in;
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
