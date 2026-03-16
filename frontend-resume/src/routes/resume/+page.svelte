<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import AboutMe from '$lib/components/Articles/AboutMe.svelte';
	import ContactInformation from '$lib/components/Articles/ContactInformation.svelte';
	import Skills from '$lib/components/Articles/Skills.svelte';
	import Professional from '$lib/components/Articles/Professional.svelte';
	import Achievements from '$lib/components/Articles/Achievements.svelte';
	import AdditionalInfo from '$lib/components/Articles/AdditionalInfo.svelte';
</script>

<div class="mx-auto max-w-8/10 px-6 mt-12">
<Header />

<div class="container">
	<div class="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
		<AboutMe />
		<div class="flex justify-center">
			<ContactInformation />
		</div>
	</div>

	<div class="mt-6 mb-4">
		<Skills />
	</div>

	<div class="my-4">
		<Professional />
	</div>

	<div class="my-6">
		<Achievements />
	</div>

	<!--
	<div class="my-6">
		<AdditionalInfo />
	</div>
	-->
</div>

<Footer />
</div>