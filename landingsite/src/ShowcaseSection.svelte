<script lang="ts">
    import Section from "./Section.svelte";
    import {onMount} from "svelte";

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

    const maxHeights = $state(new Array(features.length));
</script>

{#snippet Feature(feature: Feature, index: number)}
    {@const isOpen = openedFeature === index}

    <li
        class="feature"
        class:feature--is-open={isOpen}
    >
        <button class="feature__header" onclick={() => {openedFeature = index}}>
            <span class="feature__title">{feature.title}</span><span class="feature__status">{#if isOpen}-{:else}+{/if}</span>
        </button>
        <div
            class="feature__description"
            style="--opened-height: {maxHeights[index]}px"
            bind:clientHeight={maxHeights[index]}
        >{feature.description}</div>
    </li>
{/snippet}

<Section>
    <h2>Made to be used</h2>
    <div class="content">
        <div>
            <ul>
                {#each features as feature, index}
                    {@render Feature(feature, index)}
                {/each}
            </ul>
        </div>
        <div></div>
    </div>
</Section>

<style>
    .feature__header {
        appearance: none;
    }

    .feature__description {
        position: absolute;
        visibility: hidden;
        pointer-events: none;
    }

    :global(.feature__description--prepared) {
        height: 0;
    }

    .feature--is-open .feature__description {
        position: static;
        height: var(--opened-height);
        visibility: visible;
        transition: height 300ms ease-in-out;
    }
</style>