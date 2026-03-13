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

    const formatted = $derived(visitCount?.toLocaleString() ?? null);
</script>

<div class="flex items-center gap-3 rounded-lg border border-separator bg-card px-5 py-3 text-sm">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-muted shrink-0"
    >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>

    {#if error}
        <span class="text-muted">—</span>
    {:else if formatted === null}
        <span class="text-muted animate-pulse">···</span>
    {:else}
        <span class="font-semibold text-heading">{formatted}</span>
    {/if}

    <span class="text-muted">site visits</span>
</div>
