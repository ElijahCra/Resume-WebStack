<script lang="ts">
    import type { Component } from 'svelte';

    let {
        Icon,
        level,
        text
    }: {
        Icon: Component;
        level: number;
        text: string;
    } = $props();
</script>

<div class="flex w-full items-center gap-2 my-2" class:border-b-2={level === 2} class:border-neutral-4={level === 2} class:justify-center={level===2}>
    <Icon class="h-6 w-6" />

    {#if level === 1}
        <h1 class="text-3xl font-bold">{text}</h1>
    {:else if level === 2}
        <h2 class="text-2xl font-bold">{text}</h2>
    {:else}
        <h3 class="text-xl font-bold">{text}</h3>
    {/if}
</div>