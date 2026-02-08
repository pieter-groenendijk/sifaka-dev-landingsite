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
        <div class="section--hero__elem">No shenanigans</div>
        <div class="section--hero__elem">Enjoyable</div>
        <h1 id="section--hero__elem--main"><div>Design databases —</div><div>without grunt work</div></h1>
        <div class="section--hero__elem">Cross-compatible</div>
        <div class="section--hero__elem">Be productive</div>

        <svg
            bind:clientWidth={viewWidth} bind:clientHeight={viewHeight}
            viewBox="{viewMinX} {viewMinY} {viewWidth} {viewHeight}"
        >
            {#each rects as rect}
                {@render line(mainRect, rect)}
            {/each}
        </svg>
    </section>
</main>

<style>
    .section {

    }

    #section--hero {
        position: relative;
        isolation: isolate;
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
