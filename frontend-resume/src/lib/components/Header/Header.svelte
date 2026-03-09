<script lang="ts">
    import { personal } from '$content';
    import { fullName } from '$lib/helpers/utils';
    import Heading from '$lib/components/Heading/Heading.svelte';
    //import PDFDownloadButton from '$lib/components/PDF/PDFDownloadButton.svelte';

    let { secret = undefined }: { secret?: string } = $props();
</script>

<div class="border-b-2 border-neutral-4">
    <div class="container">
        <div class="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div class="flex-1 space-y-2">
                <Heading level={1}>{fullName}</Heading>
                <Heading color="neutralSubtle" class="text-balance" level={2}>
                    {personal.title}
                </Heading>
            </div>
            <!-- <PDFDownloadButton {secret} /> -->
        </div>
    </div>
</div>