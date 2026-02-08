<script lang="ts">
    import {onMount} from "svelte";

    const viewMinX = $state(0);
    const viewMinY = $state(0);
    let viewWidth = $state(0);
    let viewHeight = $state(0);

    let mainRect: DOMRect | undefined = $state();
    let rects: DOMRect[] | undefined = $state();

    onMount(() => {
        const sectionElem = document.getElementById("section--hero");
        if (!sectionElem) {
            return;
        }

        const observer = new ResizeObserver(() => {
            const mainElem = document.getElementById("section--hero__elem--main");
            if (!mainElem) {
                return;
            }
            mainRect = mainElem.getBoundingClientRect();


            const elems = document.getElementsByClassName("section--hero__elem");
            rects = new Array(elems.length);
            for (let i = 0; i < elems.length; ++i) {
                rects[i] = elems[i].getBoundingClientRect();
            }
        });
        observer.observe(sectionElem);

        return () => observer.disconnect;
    });
</script>

{#snippet line(rectOne: DOMRect, rectTwo: DOMRect)}
    <line
        x1={rectOne.x} y1={rectOne.y}
        x2={rectTwo.x} y2={rectTwo.y}
    />
{/snippet}

<main>
    <section id="section--hero" class="section">
        <div class="section__content">
            <div id="section--hero__elem--one" class="section--hero__elem">No shenanigans</div>
            <div id="section--hero__elem--two" class="section--hero__elem">Enjoyable</div>
            <h1 id="section--hero__elem--main">Design databases —<strong>without grunt work</strong></h1>
            <div id="section--hero__elem--three" class="section--hero__elem">Cross-compatible</div>
            <div id="section--hero__elem--four" class="section--hero__elem">Be productive</div>

            <svg
                bind:clientWidth={viewWidth} bind:clientHeight={viewHeight}
                viewBox="{viewMinX} {viewMinY} {viewWidth} {viewHeight}"
            >
                {#each rects as rect}
                    {@render line(mainRect, rect)}
                {/each}
            </svg>
        </div>
    </section>
</main>

<style>
    .section__content {
        box-sizing: border-box;
        margin-inline: auto;
        max-width: 1920px;
        min-height: 90vh;
        padding-inline: 128px;
        padding-block: 96px 128px;
    }

    #section--hero {
        isolation: isolate;
        background-color: var(--green);

        .section__content {
            max-width: 1200px;
            display: grid;
            justify-content: center;
            align-content: center;
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: min-content;
            grid-template-areas:
                "one two"
                "main main"
                "three four";
            row-gap: 96px;
        }
    }

    #section--hero__elem--main {
        grid-area: main;
        justify-self: center;
        align-self: center;
        font-size: 64px;
        font-weight: 400;
        text-align: center;
        color: var(--yellow);
    }

    #section--hero__elem--main strong {
        display: block;
        font-weight: 800;
    }

    .section--hero__elem {
        width: max-content;
        height: fit-content;
        padding-inline: 16px;
        padding-block: 8px;
        background-color: var(--dark-green);
        font-size: 32px;
        font-weight: 700;
        color: var(--light);
    }

    :is(#section--hero__elem--two, #section--hero__elem--four) {
        justify-self: right;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    line {
        stroke: black;
        stroke-width: 2px;
    }
</style>
