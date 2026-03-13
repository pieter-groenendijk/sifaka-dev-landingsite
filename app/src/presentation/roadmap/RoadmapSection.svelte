<script lang="ts">
    import Section from "../lib/Section.svelte";
    import {throttled} from "../../lib/perf/perf";
    import {milestones} from "../../data/milestones";
    import type {Milestone} from "./milestone";

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
        const onScroll = throttled(100, updateCurrentMilestoneAt);
        scrollContainerElem.addEventListener("scroll", onScroll);

        updateCurrentMilestoneAt();

        return () => {
            scrollContainerElem.removeEventListener("scroll", onScroll);
        }
    }

    function attachToMilestone(element: HTMLLIElement) {
        const onClick = throttled(300, () => {
            console.log("execute");
            element.scrollIntoView({
                behavior: "smooth",
                inline: "center",
            });
        });
        element.addEventListener("click", onClick);

        return () => {
            element.removeEventListener("click", onClick);
        }
    }
</script>

{#snippet MilestoneSnip(milestone: Milestone, at: number)}
    <li
        class="milestone"
        class:milestone--current={at === currMilestoneAt}
        class:milestone--before={at === currMilestoneAt - 1}
        class:milestone--after={at === currMilestoneAt + 1}

        {@attach attachToMilestone}
    >
        <div class="milestone__time-container">
            <div class="milestone__time">{milestone.timeLabel}</div>
        </div>
        <div class="milestone__content">
            <div class="milestone__title">{milestone.title}</div>
            <div class="milestone__summary">{milestone.summary}</div>
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
            {@render MilestoneSnip(milestone, at)}
        {/each}
    </ol>
</Section>

<style>
    :global(#section--timeline) {
        background-color: var(--dark);

        :global(.section__content) {
            content-visibility: auto;
            padding-inline: 0; /* Normal padding not ideal due to clipping of inside scroll container */
        }
    }

    .section__title {
        margin-bottom: 96px;
        font-size: 48px;
        font-weight: 800;
        text-align: center;
        color: var(--yellow);
    }

    .milestones {
        --gap: 96px;
        --item-width: clamp(300px, calc(30% - var(--gap)), 450px);
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: var(--item-width);
        gap: var(--gap);
        overflow: scroll;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
    }

    .milestones::before,
    .milestones::after {
        content: ""; /* Makes sure there is enough room without requiring a change to the content box of the container, and therefore the clamp function determining item width */
        grid-column: span 2;
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
        height: 3px;
        flex-grow: 1;
        background-color: var(--light);
        opacity: 0.1;
        transition: opacity 400ms ease-in-out;
    }

    .milestone__time {
        width: fit-content;
        font-size: 20px;
        font-weight: 500;
        color: var(--light);
        opacity: 0.1;
        transition: opacity 400ms ease-in-out;
    }

    .milestone--current :is(.milestone__time, .milestone__content), /* current */
    .milestone--current + .milestone :is(.milestone__time, .milestone__content), /* after current */
    .milestone:has(+ .milestone--current) :is(.milestone__time, .milestone__content) /* before current */
    {
        opacity: 1;
    }

    .milestone--current .milestone__time-container::before, /* current ::before */
    .milestone--current .milestone__time-container::after, /* current ::after */
    .milestone--current + .milestone .milestone__time-container::before, /* after current ::before */
    .milestone:has(+ .milestone--current) .milestone__time-container::after /* before current ::after */
    {
        opacity: 0.6;
    }

    .milestone--current + .milestone .milestone__time-container::after,
    .milestone:has(+ .milestone--current) .milestone__time-container::before {
        opacity: 0.2;
    }

    .milestone__content {
        opacity: 0.2;
        transition: opacity 500ms ease-in-out;
    }

    .milestone__content > *:not(:last-child) {
        margin-bottom: 24px;
    }

    .milestone__title {
        margin-inline: auto;
        padding: 12px 8px;
        width: fit-content;
        background-color: var(--dark-green);
        font-size: 22px;
        font-weight: 500;
        text-transform: uppercase;
        color: var(--yellow);
    }

    .milestone__summary {
        text-align: justify;
        font-size: 18px;
        color: var(--light);
    }

    .milestone__points {
        font-size: 18px;
        font-weight: 300;
        color: var(--light);
    }

    .milestone__point:not(:last-child) {
        margin-bottom: 12px;
    }

    .milestone__point::before {
        content: "› ";
    }
</style>
