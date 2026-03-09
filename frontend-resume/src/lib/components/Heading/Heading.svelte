<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cva, type VariantProps } from 'class-variance-authority';
    import { twMerge } from 'tailwind-merge';

    const headingVariants = cva('font-bold', {
        variants: {
            color: {
                danger: 'text-danger-11',
                neutral: 'text-neutral-12',
                neutralSubtle: 'text-neutral-11',
                primary: 'text-primary-11',
            },
            size: {
                1: 'text-4xl md:text-5xl',
                2: 'text-2xl md:text-3xl',
                3: 'text-xl md:text-2xl',
                4: 'text-lg md:text-xl',
                5: 'text-base md:text-lg',
                6: 'text-sm md:text-base',
            },
        },
        defaultVariants: {
            color: 'neutral',
        },
    });

    type Color = VariantProps<typeof headingVariants>['color'];
    type Size = VariantProps<typeof headingVariants>['size'];

    let {
        class: className = '',
        color = 'neutral' as Color,
        level,
        size = undefined as Size | undefined,
        children,
    }: {
        class?: string;
        color?: Color;
        level: 1 | 2 | 3 | 4 | 5 | 6;
        size?: Size;
        children?: Snippet;
    } = $props();

    let classes = $derived(twMerge(headingVariants({ color, size: size || level }), className));
</script>

{#if level === 1}
    <h1 class={classes}>{@render children?.()}</h1>
{:else if level === 2}
    <h2 class={classes}>{@render children?.()}</h2>
{:else if level === 3}
    <h3 class={classes}>{@render children?.()}</h3>
{:else if level === 4}
    <h4 class={classes}>{@render children?.()}</h4>
{:else if level === 5}
    <h5 class={classes}>{@render children?.()}</h5>
{:else if level === 6}
    <h6 class={classes}>{@render children?.()}</h6>
{/if}
