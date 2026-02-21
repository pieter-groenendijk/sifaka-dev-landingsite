<script lang="ts">
    import Section from "./lib/Section.svelte";

    interface Milestone {
        timeLabel: string,
        title: string,
        keyPoints: string[],
    }

    const milestones: Milestone[] = $state([]);
</script>

{#snippet Milestone(milestone: Milestone)}
    <li>
        <div>{milestone.timeLabel}</div>
        <div>
            <div>{milestone.title}</div>
            <ul>
                {#each milestone.keyPoints as keyPoint}
                    <li>{keyPoint}</li>
                {/each}
            </ul>
        </div>
    </li>
{/snippet}

<Section>
    <h2>Roadmap</h2>
    <ol>
        {#each milestones as milestone}
            {@render Milestone(milestone)}
        {/each}
    </ol>
</Section>

<style>

</style>