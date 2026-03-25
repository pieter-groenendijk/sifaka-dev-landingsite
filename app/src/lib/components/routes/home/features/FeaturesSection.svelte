<script lang="ts">
    import Section from "$lib/components/general/Section.svelte";

    interface Feature {
        title: string,
        description: string,
    }

    const features = [
        {
            title: "Time-efficient",
            description: "Work at any depth, whether high-level or hyper-detailed, without grunt work. The engine incrementally generates schema and propagates changes through every derivative. Real-time validation, structural options and context-aware actions translate intent into implementation.",
        },
        {
            title: "Practice-oriented",
            description: "The engine is driven by practical effect, not academic perfection. Database-specific theory and best-practices are combined with your access patterns and domain for automation and non-blocking feedback. Designed for versioning and incremental workflows.",
        },
        {
            title: "Easy-to-use",
            description: "It's built to be learned by doing, with an wiki and docs to fallback on. The tool passively guides you by automating grunt work, providing real-time feedback, and proposing options when more opinionated. ",
        },
        {
            title: "Broad compatibility",
            description: "Supports a multitude of database platforms with specialized engines based on database-specific theory and best-practices. Moreso, projects can design a domain in full or part towards multiple paradigms & platforms.",
        },
    ];
    const featureMaxHeights = $state(new Array(features.length));
    let openedFeature = $state(0);
</script>

{#snippet Feature(feature: Feature, index: number)}
    {@const isOpen = openedFeature === index}

    <li
        class="feature"
        class:feature--is-open={isOpen}
    >
        <button class="feature__header" onclick={() => {openedFeature = index}}>
            <span class="feature__title">{feature.title}</span><span class="feature__status">{#if isOpen}−{:else}+{/if}</span>
        </button>
        <div
            class="feature__description feature__description--styled"
            style="--max-height: {featureMaxHeights[index]}px"
        >
            {feature.description}
            <div
                class="feature__description--styled feature__description--measurement"
                aria-hidden="true"
                bind:clientHeight={featureMaxHeights[index]}
            >
                {feature.description}
            </div>
        </div>
    </li>
{/snippet}

<Section id="section--features">
    <h2 class="title">Pragmatic & Platform-agnostic</h2>
    <div class="hor-divided">
        <ul class="features">
            {#each features as feature, index}
                {@render Feature(feature, index)}
            {/each}
        </ul>
    </div>
    <div class="early-dev-disclaimer">* Currently in early development. Described features are currently being implemented.</div>
</Section>

<style>
    :global(#section--features .section__content) {
        max-width: 1600px;
        min-height: 700px;
        display: flex;
        flex-direction: column;
    }

    .title {
        margin-bottom: var(--gap-64);
        font-size: var(--font-size-48);
        font-weight: 800;
        color: var(--yellow);
    }

    .hor-divided {
        container-type: inline-size;
        container-name: hor-divided;
        flex-grow: 1;
        display: flex;
        gap: var(--gap-128);
    }

    .features {
        container-type: inline-size;
        container-name: features;
        align-self: center;
        flex-grow: 6;
        flex-basis: 0;
        max-width: 65ch;
    }

    .feature {
        margin-bottom: var(--gap-32);
        list-style: none;
        color: var(--yellow);
    }

    .feature__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-transform: uppercase;
        font-size: var(--font-size-22);
        transition: 300ms font-weight ease-in-out;
    }

    .feature__title {
        text-align: left;
    }

    .feature__description--styled {
        font-size: var(--font-size-18);
        font-weight: 300;

        @container features (max-width: 50ch) {
            text-align: justify;
            hyphens: auto;
        }
    }

    .feature__description {
        margin-top: 0;
        position: relative;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition:
                margin-top 300ms ease-in-out,
                max-height 300ms ease-in-out,
                opacity 200ms ease-in-out;
    }

    .feature--is-open .feature__description {
        margin-top: var(--gap-16);
        max-height: var(--max-height);
        opacity: 1;
    }

    .feature__description--measurement {
        position: absolute;
        top: 0;
        inset-inline: 0;
        max-height: unset;
        visibility: hidden;
        pointer-events: none;
    }

    .early-dev-disclaimer {
        font-size: var(--font-size-14);
        font-weight: 300;
        color: var(--light);
        opacity: 0.7;
    }
</style>