<script lang="ts">
    // In Svelte, you can use lucide-svelte or svelte-hero-icons
    import { Briefcase } from 'lucide-svelte';
    import SectionHeading from '$lib/components/SectionHeading/SectionHeading.svelte';
    import ProfessionalItem from './ProfessionalItem.svelte';
    import { sortedProfessionalExperiences } from '$lib/helpers/utils';
</script>

<article class="rounded-xl bg-neutral-3 mt-12">
    <div class="container">
        <div class="flex justify-center text-center">
            <SectionHeading
                    Icon={Briefcase}
                    level={2}
                    text="Professional Experience"
            />
        </div>

        {#each sortedProfessionalExperiences as { _id, _filename, ...rest } (_id)}
            <ProfessionalItem {...rest} />
        {/each}
    </div>
</article>