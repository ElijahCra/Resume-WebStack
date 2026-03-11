<script lang="ts">
    import { personal } from '$content';
    import { links } from '$lib/config/links';
    import { fullName } from '$lib/helpers/utils';
    import ButtonLink from '$lib/components/Button/ButtonLink.svelte';

    const currentYear = new Date().getFullYear();
</script>

<footer class="bg-neutral-3 mt-12 py-2 text-neutral-12">
    <div class="container text-center">
        {#if links && links.length > 0}
            <div class="flex justify-center">
                <div class="grid grid-flow-col gap-2">
                    {#each links as link (link.title)}
                        <ButtonLink
                                class="h-12 w-12 rounded-full p-0"
                                href={link.href}
                        >
              <span class="sr-only">
                {personal.givenName} on {link.title}
              </span>
                            <svelte:component this={link.icon} aria-hidden size={18} />
                        </ButtonLink>
                    {/each}
                </div>
            </div>
        {/if}

        <div class="mt-6">
            Copyright ©{currentYear} {fullName}
        </div>

        <div class="mt-1 text-sm">
          This resume was generated with <a class="link" href="https://svelte.dev/">SvelteKit</a> and deployed on <a class="link" href="https://aws.amazon.com/">AWS</a>.
        </div>
    </div>
</footer>