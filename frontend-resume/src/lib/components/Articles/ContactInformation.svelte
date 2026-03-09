<script lang="ts">
    import { personal } from '$content';
    import type { PrivateField } from '$content';
    import { Contact } from 'lucide-svelte';
    import SectionHeading from '$lib/components/SectionHeading/SectionHeading.svelte';

    let {
        privateInformation = []
    }: {
        privateInformation?: PrivateField[]
    } = $props();
</script>

<article>
    <SectionHeading
            Icon={Contact}
            level={3}
            text="Contact Information"
    />

    <ul class="mt-2">
        <li>
            <strong>Location:</strong> {personal.location}
        </li>

        {#each privateInformation as privateField (privateField.label)}
            {@const FieldComponent = privateField.component}
            <li class="mt-3">
                <strong>{privateField.label}</strong>{' '}
                <div><FieldComponent /></div>
            </li>
        {/each}
    </ul>
</article>