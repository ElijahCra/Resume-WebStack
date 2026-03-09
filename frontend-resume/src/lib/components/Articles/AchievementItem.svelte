<script lang="ts">
    import { GraduationCap } from 'lucide-svelte';
    import Heading from '$lib/components/Heading/Heading.svelte';
    import Prose from '$lib/components/Prose/Prose.svelte';

    import type { Component } from 'svelte';

    let { achievement, component, organization }: {
        achievement: string;
        component: Component;
        organization: string;
    } = $props();
</script>

<article class="border-t-2 border-neutral-6 py-6 first-of-type:border-none last-of-type:pb-0">
    <Heading class="text-balance" level={3}>
        {achievement}
    </Heading>

    <div class="mt-1 flex items-center gap-2 font-medium tracking-wide">
        <GraduationCap class="h-6 w-6" />
        {organization}
    </div>

    <Prose {component} />
</article>