<script lang="ts">
	import { Download, Loader2 } from 'lucide-svelte';

	let { secret = undefined }: { secret?: string } = $props();

	let loading = $state(false);
	let error = $state('');

	async function downloadPdf() {
		loading = true;
		error = '';

		try {
			const url = secret ? `/api/resume/pdf?secret=${secret}` : '/api/resume/pdf';
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`Failed to generate PDF (${response.status})`);
			}

			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = blobUrl;
			a.download = 'Elijah_Crain_Resume.pdf';
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(blobUrl);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to download PDF';
		} finally {
			loading = false;
		}
	}
</script>

<button
	onclick={downloadPdf}
	disabled={loading}
	class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
>
	{#if loading}
		<Loader2 size={16} class="animate-spin" />
		Generating...
	{:else}
		<Download size={16} />
		Download PDF
	{/if}
</button>

{#if error}
	<p class="mt-2 text-sm text-red-600">{error}</p>
{/if}
