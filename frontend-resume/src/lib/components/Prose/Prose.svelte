<script lang="ts">
    import type { Component as SvelteComponent } from 'svelte';
    import { twMerge } from 'tailwind-merge';

    let { class: className = '', component: Component }: { class?: string; component: SvelteComponent } = $props();
</script>

<div
    class={twMerge('prose max-w-[98%] mx-auto mt-2 text-base text-neutral-12 [&>p]:mb-2', className)}
>
    <Component />
</div>