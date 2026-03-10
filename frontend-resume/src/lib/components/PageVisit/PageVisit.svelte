<script lang="ts">
    import { onMount } from 'svelte';

    let visitCount: number | null = $state(null);
    let error: string | null = $state(null);

    onMount(async () => {
        const hasFetched = sessionStorage.getItem('hasFetchedVisitCount');

        if (!hasFetched) {
            try {
                const response = await fetch('/api/v1/new-visit', { cache: 'no-store' });

                if (!response.ok) {
                    error = 'Network response was not ok.';
                    return;
                }

                const data = await response.json();

                if (data.total_visit !== undefined) {
                    visitCount = data.total_visit;
                } else {
                    error = 'Total_visit property not found in response';
                }
            } catch (err) {
                console.error('Error fetching visit count:', err);
                error = err instanceof Error ? err.message : String(err);
            } finally {
                sessionStorage.setItem('hasFetchedVisitCount', 'true');
            }
        } else {
            visitCount = parseInt(sessionStorage.getItem('visitCount') ?? '', 10) || null;
        }
    });

    $effect(() => {
        if (visitCount !== null) {
            sessionStorage.setItem('visitCount', visitCount.toString());
        }
    });
</script>

<div>
    <h2 class="text-accent-11">Website Visits:</h2>
    {#if visitCount === null}
        <p>{error ? error : "Loading..."}</p>
    {:else}
        <p>{visitCount}</p>
    {/if}
</div>
