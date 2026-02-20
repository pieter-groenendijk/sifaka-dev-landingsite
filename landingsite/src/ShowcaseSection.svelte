<script lang="ts">
    import Section from "./Section.svelte";

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

    function setMaxHeight(node: HTMLElement): void {
        node.style.setProperty("--opened-height", `${node.clientHeight}px`);
        node.classList.remove("feature__description--measuring");
    }
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
            class="feature__description feature__description--measuring"
            use:setMaxHeight
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
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition:
            max-height 300ms ease-in-out,
            opacity 200ms ease-in-out;
    }

    .feature__description--measuring {
        position: absolute;
        max-height: unset;
        visibility: hidden;
        pointer-events: none;
    }

    .feature--is-open .feature__description {
        max-height: var(--opened-height);
        opacity: 1;
    }
</style>