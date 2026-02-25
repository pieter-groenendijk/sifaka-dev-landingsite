<script lang="ts">
    import Section from "./lib/Section.svelte";
    import {throttle} from "../lib/perf/perf";

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

    let currMilestoneAt = $state(Math.trunc(milestones.length / 2));

    function initScrollContainer(scrollContainerElem: HTMLOListElement) {
        const children = scrollContainerElem.children as HTMLCollectionOf<HTMLElement>;
        if (children.length < 1) {
            return;
        }


        function updateCurrentMilestoneAt(): void {
            const middleOffsetLeft = scrollContainerElem.scrollLeft + scrollContainerElem.offsetWidth / 2;

            // If it's left, go left until you've gone too far
            let leftAt;
            for (
                leftAt = currMilestoneAt; 
                leftAt > 0 && middleOffsetLeft <= children[leftAt].offsetLeft;
                --leftAt
            ) {}

            if (leftAt !== currMilestoneAt) {
                currMilestoneAt = leftAt;
                return;
            }

            // If it's right, go right until you've gone too far
            let rightAt;
            for (
                rightAt = currMilestoneAt + 1;
                rightAt < children.length && middleOffsetLeft > children[rightAt].offsetLeft;
                ++rightAt
            ) {}
            --rightAt;

            if (rightAt !== currMilestoneAt) {
                currMilestoneAt = rightAt;
                return;
            }
        }
        const onScroll = throttle(100, updateCurrentMilestoneAt);
        scrollContainerElem.addEventListener("scroll", onScroll);

        updateCurrentMilestoneAt();

        return () => {
            scrollContainerElem.removeEventListener("scroll", onScroll);
        }
    }
</script>

{#snippet Milestone(milestone: Milestone, at: number)}
    <li class="milestone" class:milestone--current={at === currMilestoneAt}>
        <div class="milestone__time-container">
            <div class="milestone__time">{milestone.timeLabel}</div>
        </div>
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
    <ol class="milestones" {@attach initScrollContainer}>
        {#each milestones as milestone, at}
            {@render Milestone(milestone, at)}
        {/each}
    </ol>
</Section>

<style>
    :global(#section--timeline) {
        background-color: var(--dark);

        :global(.section__content) {
            padding-inline: 0; /* Normal padding not ideal due to clipping of inside scroll container */
        }
    }

    .section__title {
        margin-bottom: 60px;
        font-size: 48px;
        font-weight: 800;
        text-align: center;
        color: var(--yellow);
    }

    .milestones {
        --max-item-width: 600px;
        --gap: 96px;
        padding-inline: 50%;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: clamp(300px, 30%, 600px);
        gap: var(--gap);
        overflow: scroll;
        scroll-snap-type: x mandatory;
    }

    .milestone {
        scroll-snap-align: center;
    }

    .milestone__time-container {
        margin-inline: calc(-0.5 * var(--gap));
        margin-bottom: 45px;
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;
    }

    .milestone__time-container::before, 
    .milestone__time-container::after {
        content: "";
        display: block;
        height: 16px;
        flex-grow: 1;
        background-color: var(--green);
    }

    .milestone__time {
        width: fit-content;
        font-size: 20px;
        color: var(--green);
    }

    .milestone__content {
        padding: 15px;
        text-align: center;
    }

    .milestone__time-container::before, 
    .milestone__time-container::after,
    .milestone__time-container > *,
    .milestone__content {
        opacity: 0.6; 
        transition: opacity 200ms ease-in-out;
    }

    .milestone--current .milestone__content,
    .milestone--current .milestone__time-container::before,
    .milestone--current .milestone__time-container::after,
    .milestone--current + .milestone .milestone__time-container::before,
    .milestone:has(+ .milestone--current) .milestone__time-container::after {
        opacity: 1;
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
