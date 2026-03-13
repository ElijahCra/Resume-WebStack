<script lang="ts">
    import { GraduationCap } from 'lucide-svelte';
    import { sortedAchievements } from '$lib/helpers/utils';
    import SectionHeading from '$lib/components/SectionHeading/SectionHeading.svelte';
    import AchievementItem from './AchievementItem.svelte';
</script>

<article class="rounded-xl bg-neutral-3">
    <div class="container ">
        <div class="flex justify-center text-center ">
            <SectionHeading
                    Icon={GraduationCap}
                    level={2}
                    text="Achievements"
            />
        </div>

        {#each sortedAchievements as achievement (achievement._id)}
            <AchievementItem {...achievement} />
        {/each}
    </div>
</article>