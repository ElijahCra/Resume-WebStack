<script lang="ts">
    import { allSkills } from '$content';
    import { Check } from 'lucide-svelte';
    import Heading from '$lib/components/Heading/Heading.svelte';
    import Prose from '$lib/components/Prose/Prose.svelte';
    import SectionHeading from '$lib/components/SectionHeading/SectionHeading.svelte';
</script>

<article>
    <SectionHeading
            Icon={Check}
            level={3}
            text="Skills & Expertise"
    />

    <div class="mt-2 grid grid-flow-row gap-6 lg:grid-flow-col">
        {#each allSkills as skill (skill._id)}
            <div>
                <Heading level={4}>
                    <div class="flex items-center gap-2">
                        {skill.title}
                    </div>
                </Heading>

                <Prose class="text-neutral-11" component={skill.component} />
            </div>
        {/each}
    </div>
</article>