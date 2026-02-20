<script lang="ts">
    import Section from "./lib/Section.svelte";

    interface Feature {
        title: string,
        description: string,
    }

    const features = [
        {
            title: "Be productive",
            description: "Built to deeply understand any given domain to provide you the tools you need and want. It guides the development without undermining your control; No AI. Just like an IDE.",
        },
        {
            title: "Cross-compatible",
            description: "Built to deeply understand any given domain to provide you the tools you need and want. It guides the development without undermining your control; No AI. Just like an IDE.",
        },
        {
            title: "Enjoyable",
            description: "Built to deeply understand any given domain to provide you the tools you need and want. It guides the development without undermining your control; No AI. Just like an IDE.",
        },
        {
            title: "No shenanigans",
            description: "Built to deeply understand any given domain to provide you the tools you need and want. It guides the development without undermining your control; No AI. Just like an IDE.",
        },
    ];

    let openedFeature = $state(0);

    const featureMaxHeights = $state(new Array(features.length));
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
            class="feature__description feature__description--displayed"
            style="--max-height: {featureMaxHeights[index]}px"
        >
            {feature.description}
            <div
                class="feature__description feature__description--measurement"
                aria-hidden="true"
                bind:clientHeight={featureMaxHeights[index]}
            >
                {feature.description}
            </div>
        </div>
    </li>
{/snippet}

<Section id="section--features">
    <h2 class="title">Made to be used</h2>
    <div class="hor-divided">
        <ul class="features">
            {#each features as feature, index}
                {@render Feature(feature, index)}
            {/each}
        </ul>
        <div class="demo">
            <div class="demo-placeholder"></div>
            <button></button>
        </div>
    </div>
</Section>

<style>
    :global(#section--features .section__content) {
        max-width: 1600px;
        display: flex;
        flex-direction: column;
    }

    .title {
        margin-bottom: 60px;
        font-size: 48px;
        font-weight: 800;
        color: var(--yellow);
    }

    .hor-divided {
        flex-grow: 1;
        display: grid;
        grid-template-columns: minmax(300px, 6fr) 8fr;
        gap: 128px;
    }

    .features {
        align-self: center;
    }

    .feature {
        margin-bottom: 30px;
        list-style: none;
        color: var(--yellow);
    }

    .feature__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;
        font-size: 22px;
        transition: 300ms font-weight ease-in-out;
    }

    .feature__description {
        font-size: 18px;
        font-weight: 300;
    }

    .feature__description--displayed {
        position: relative;
        margin-top: 16px;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition:
            max-height 300ms ease-in-out,
            opacity 200ms ease-in-out;
    }

    .feature__description--measurement {
        position: absolute;
        top: 0;
        inset-inline: 0;
        max-height: unset;
        visibility: hidden;
        pointer-events: none;
    }

    .feature--is-open .feature__description--displayed {
        max-height: var(--max-height);
        opacity: 1;
    }

    .demo {
        background-color: var(--dark);
    }
</style>