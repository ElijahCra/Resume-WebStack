<script lang="ts">
    import type { Snippet } from 'svelte';
    import { type VariantProps } from 'class-variance-authority';
    import { twMerge } from 'tailwind-merge';
    import { buttonVariants } from './variants';

    type Size = VariantProps<typeof buttonVariants>['size'];

    let {
        class: className = '',
        href,
        size = 'md' as Size,
        children,
        ...restProps
    }: {
        class?: string;
        href: string;
        size?: Size;
        children?: Snippet;
        [key: string]: unknown;
    } = $props();
</script>

<a
    class={twMerge(buttonVariants({ size }), className)}
    {href}
    {...restProps}
>
    {@render children?.()}
</a>
