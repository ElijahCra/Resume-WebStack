<script lang="ts">
    import { Calendar } from 'lucide-svelte';
    import Heading from '$lib/components/Heading/Heading.svelte';
    import Prose from '$lib/components/Prose/Prose.svelte';

    import type { Component } from 'svelte';

    let { component, endDate, organization, startDate, title }: {
        component: Component;
        endDate?: string;
        organization: string;
        startDate: string;
        title: string;
    } = $props();
</script>

<article class="first-of-type:mt-6">
    <Heading class="text-balance" level={3}>
        <span class="rounded-md bg-neutral-12 px-2 text-neutral-1">
            {title}
        </span>
        <span> at {organization}</span>
    </Heading>

    <div class="mt-1 flex items-center gap-2 font-medium tracking-wide">
        <Calendar class="inline h-6 w-6" />
        {startDate}–{!endDate ? 'Current' : endDate}
    </div>

    <Prose {component} />
</article>