<script lang="ts">
    import { personal } from '$content';
    import { User } from 'lucide-svelte';
    import Prose from '$lib/components/Prose/Prose.svelte';
    import SectionHeading from '$lib/components/SectionHeading/SectionHeading.svelte';
</script>

<article>
    <SectionHeading Icon={User} level={3} text="About Me" />
    <Prose component={personal.component} />
</article>