<script lang="ts">
    import { additionalInfo } from '$content';
    import { Paintbrush } from 'lucide-svelte';
    import Prose from '$lib/components/Prose/Prose.svelte';
    import SectionHeading from '$lib/components/SectionHeading/SectionHeading.svelte';
</script>

<article>
    <div class="mb-6 flex justify-center">
        <SectionHeading
                Icon={Paintbrush}
                level={2}
                text={additionalInfo.title}
        />
    </div>

    <Prose component={additionalInfo.component} />
</article>