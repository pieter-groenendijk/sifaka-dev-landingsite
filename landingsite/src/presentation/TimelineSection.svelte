<script lang="ts">
    import Section from "./lib/Section.svelte";

    interface Milestone {
        timeLabel: string,
        title: string,
        keyPoints: string[],
    }

    const milestones: Milestone[] = $state([
        {
            timeLabel: "2026",
            title: "MongoDB Focus",
            keyPoints: [
                "Document paradigm support",
                "MongoDB support",
                "Project consistency at all times",
                "Automate recurring labor-intensive tasks",
            ],
        },
        {
            timeLabel: "2026",
            title: "MongoDB Focus",
            keyPoints: [
                "Document paradigm support",
                "MongoDB support",
                "Project consistency at all times",
                "Automate recurring labor-intensive tasks",
            ],
        },
        {
            timeLabel: "2026",
            title: "MongoDB Focus",
            keyPoints: [
                "Document paradigm support",
                "MongoDB support",
                "Project consistency at all times",
                "Automate recurring labor-intensive tasks",
            ],
        },
        {
            timeLabel: "2026",
            title: "MongoDB Focus",
            keyPoints: [
                "Document paradigm support",
                "MongoDB support",
                "Project consistency at all times",
                "Automate recurring labor-intensive tasks",
            ],
        },
        {
            timeLabel: "2026",
            title: "MongoDB Focus",
            keyPoints: [
                "Document paradigm support",
                "MongoDB support",
                "Project consistency at all times",
                "Automate recurring labor-intensive tasks",
            ],
        },
        {
            timeLabel: "2026",
            title: "MongoDB Focus",
            keyPoints: [
                "Document paradigm support",
                "MongoDB support",
                "Project consistency at all times",
                "Automate recurring labor-intensive tasks",
            ],
        },
    ]);
</script>

{#snippet Milestone(milestone: Milestone)}
    <li class="milestone">
        <div class="milestone__time">{milestone.timeLabel}</div>
        <div class="milestone__content">
            <div class="milestone__title">{milestone.title}</div>
            <ul class="milestone__points">
                {#each milestone.keyPoints as keyPoint}
                    <li class="milestone__point">{keyPoint}</li>
                {/each}
            </ul>
        </div>
    </li>
{/snippet}

<Section id="section--timeline">
    <h2 class="section__title">Roadmap</h2>
    <ol class="milestones">
        {#each milestones as milestone}
            {@render Milestone(milestone)}
        {/each}
    </ol>
</Section>

<style>
    :global(#section--timeline) {
        background-color: var(--dark);
    }

    .section__title {
        margin-bottom: 60px;
        font-size: 48px;
        font-weight: 800;
        text-align: center;
        color: var(--yellow);
    }

    .milestones {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: clamp(300px, 30vw, 600px);
        overflow: scroll;
        gap: 96px;
    }

    .milestone {
    }

    .milestone__time {
        margin-inline: auto;
        margin-bottom: 45px;
        width: fit-content;
        font-size: 20px;
        color: var(--green);
    }

    .milestone__content {
        padding: 15px;
        /*background-color: var(--green);*/
        text-align: center;
    }

    .milestone__title {
        margin-bottom: 15px;
        padding: 15px;
        background-color: var(--dark-green);
        font-size: 22px;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--yellow);
    }

    .milestone__points {
        padding: 15px;
        background-color: var(--dark-green);
        font-size: 18px;
        font-weight: 300;
        color: var(--light);
    }

    .milestone__point:not(:last-child) {
        margin-bottom: 15px;
    }
</style>