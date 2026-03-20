<script lang="ts">
    import {throttled} from "$lib/logic/perf/perf";
    import Section from "$lib/components/general/Section.svelte";
    import {milestones} from "./milestones.ts";

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
                block: "center",
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
        margin-bottom: var(--gap-96);
        font-size: var(--font-size-48);
        font-weight: 800;
        text-align: center;
        color: var(--yellow);
    }

    .milestones {
        --gap: var(--gap-96);
        --peek: 20%;
        container-type: inline-size;
        container-name: milestones;
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: min(320px, calc(100% - 2 * var(--gap) - var(--peek)));
        gap: var(--gap);
        overflow: scroll;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        scroll-padding: var(--gap);
    }

    .milestones::before,
    .milestones::after {
        content: ""; /* Makes sure there is enough room without requiring a change to the content box of the container, and therefore the clamp function determining item width */
        grid-column: span 2;
    }

    .milestone {
        cursor: pointer;
        scroll-snap-align: center;

        @container milestones (max-width: 450px) {
            scroll-snap-align: start;
        }
    }

    .milestone--current {
        cursor: unset;
    }

    .milestone__time-container {
        margin-inline: calc(-0.5 * var(--gap)); /* extend out of the element to cover the gap */
        margin-bottom: var(--gap-64);
        display: flex;
        flex-direction: row;
        gap: var(--gap-8);
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
        font-size: var(--font-size-20);
        font-weight: 500;
        color: var(--light);
        opacity: 0.1;
        transition: opacity 400ms ease-in-out;
    }

    .milestone__content {
        opacity: 0.2;
        transition: opacity 500ms ease-in-out;
    }

    .milestone__content > *:not(:last-child) {
        margin-bottom: var(--gap-32);
    }

    @container milestones (min-width: 1500px) {
        .milestone--current :is(.milestone__time, .milestone__content),
        .milestone--after :is(.milestone__time, .milestone__content),
        .milestone--before :is(.milestone__time, .milestone__content)
        {
            opacity: 1;
        }

        .milestone--current .milestone__time-container::before,
        .milestone--current .milestone__time-container::after,
        .milestone--after .milestone__time-container::before,
        .milestone--before .milestone__time-container::after
        {
            opacity: 0.6;
        }

        .milestone--after .milestone__time-container::after,
        .milestone--before .milestone__time-container::before {
            opacity: 0.2;
        }
    }

    @container milestones (max-width: 1500px) {
        .milestone--current :is(.milestone__time, .milestone__content) {
            opacity: 1;
        }

        .milestone--current .milestone__time-container::before,
        .milestone--current .milestone__time-container::after {
            opacity: 0.6;
        }

        .milestone--before .milestone__time-container::after,
        .milestone--after .milestone__time-container::before {
            opacity: 0.2;
        }
    }

    .milestone__title {
        margin-inline: auto;
        padding: var(--gap-12) var(--gap-8);
        width: fit-content;
        background-color: var(--dark-green);
        font-size: var(--font-size-22);
        font-weight: 500;
        text-transform: uppercase;
        color: var(--yellow);
    }

    .milestone__summary {
        text-align: justify;
        font-size: var(--font-size-18);
        color: var(--light);
    }

    .milestone__points {
        font-size: var(--font-size-18);
        font-weight: 300;
        color: var(--light);
    }

    .milestone__point:not(:last-child) {
        margin-bottom: var(--gap-12);
    }

    .milestone__point::before {
        content: "› ";
    }
</style>
