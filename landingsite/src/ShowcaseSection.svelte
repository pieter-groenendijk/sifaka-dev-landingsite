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
            <span class="feature__title">{feature.title}</span><span class="feature__status">{#if isOpen}−{:else}+{/if}</span>
        </button>
        <div
            class="feature__description feature__description--measuring"
            use:setMaxHeight
        >{feature.description}</div>
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

    .feature__title {

    }

    .feature__description {
        margin-top: 16px;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        font-size: 18px;
        font-weight: 300;
        transition:
            max-height 300ms ease-in-out,
            opacity 200ms ease-in-out;
    }

    .feature__description--measuring {
        max-height: unset;
        visibility: hidden;
        pointer-events: none;
    }

    .feature--is-open .feature__description {
        max-height: var(--opened-height);
        opacity: 1;
    }

    .demo {
        background-color: var(--dark);
    }
</style>