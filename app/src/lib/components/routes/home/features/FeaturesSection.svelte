<script lang="ts">
    import Section from "$lib/components/general/Section.svelte";

    interface Feature {
        title: string,
        description: string,
    }

    const features = [
        {
            title: "Time-efficient",
            description: "Focus on critical decisions, not every detail. Optimized for an incremental workflow, the engine generates most schema structures and propagates your changes through all derivatives. Real-time validation, structural options and context actions translate intent into implementation.",
        },
        {
            title: "Practice-oriented",
            description: "The engine is driven by effect, not academic perfection. Database-specific theory and best-practices are combined with your access patterns and domain for effective support. Built for incremental version-controlled development.",
        },
        {
            title: "Broad compatiblity",
            description: "Supports a multitude of database platforms with specialized engines based on database-specific theory and best-practices. Moreso, projects can design a domain in full or part towards multiple paradigms & platforms.",
        },
        {
            title: "Low-barrier",
            description: "The tool passively guides you by automating grunt work, providing real-time feedback, and proposing options for more subjective decisions. It's built to be learned by doing, with an extensive wiki and docs safety net.",
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
    <h2 class="title">Solves real problems</h2>
    <div class="hor-divided">
        <ul class="features">
            {#each features as feature, index}
                {@render Feature(feature, index)}
            {/each}
        </ul>
<!--        <div class="demo">-->
<!--            <div class="demo-placeholder"></div>-->
<!--        </div>-->
    </div>
    <div class="early-dev-disclaimer">* Currently in early development. Described features are currently being implemented.</div>
</Section>

<style>
    :global(#section--features .section__content) {
        max-width: 1600px;
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

    .demo {
        flex-grow: 8;
        background-color: var(--dark);

        @container hor-divided (max-width: 1300px) {
            display: none;
        }

        @media (pointer: coarse) {
            display: none;
        }
    }

    .early-dev-disclaimer {
        font-size: var(--font-size-14);
        font-weight: 300;
        color: var(--light);
        opacity: 0.7;
    }
</style>