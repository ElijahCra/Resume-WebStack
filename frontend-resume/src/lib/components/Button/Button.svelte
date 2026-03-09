<script lang="ts">
    import type { Snippet } from 'svelte';
    import { type VariantProps } from 'class-variance-authority';
    import { twMerge } from 'tailwind-merge';
    import { buttonVariants } from './variants';

    type Size = VariantProps<typeof buttonVariants>['size'];

    let {
        class: className = '',
        size = 'md' as Size,
        onclick,
        children,
        ...restProps
    }: {
        class?: string;
        size?: Size;
        onclick?: (e: MouseEvent) => void;
        children?: Snippet;
        [key: string]: unknown;
    } = $props();
</script>

<button
    class={twMerge(buttonVariants({ size }), className)}
    type="button"
    {onclick}
    {...restProps}
>
    {@render children?.()}
</button>
