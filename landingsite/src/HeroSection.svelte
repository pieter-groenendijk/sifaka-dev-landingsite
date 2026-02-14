<script lang="ts">
    import {onMount} from "svelte";

    const viewMinX = $state(0);
    const viewMinY = $state(0);
    let viewWidth = $state(0);
    let viewHeight = $state(0);

    let mainRect: DOMRect | undefined = $state();
    let rects: DOMRect[] | undefined = $state();

    onMount(() => {
        const elems = document.getElementsByClassName("section--hero__elem") as HTMLCollectionOf<HTMLElement>;
        const elemsLength = elems.length;

        // Random movement
        {
            const maxPixelDistance = 10;
            const averageMsDuration = 2000;

            for (let i = 0; i < elemsLength; ++i) {
                const msDuration = Math.random() * averageMsDuration * 0.5 + averageMsDuration;

                setInterval(() => {
                    const angle = Math.random() * 2 * Math.PI;
                    const distance = Math.sqrt(Math.random()) * maxPixelDistance;

                    const offsetX = Math.trunc(Math.sin(angle) * distance);
                    const offsetY = Math.trunc(Math.cos(angle) * distance);

                    // Set goal for positions before next paint
                    requestAnimationFrame(() => {
                        const element = elems[i];

                        element.style.setProperty("--offsetX", `${offsetX}px`);
                        element.style.setProperty("--offsetY", `${offsetY}px`);
                    });
                }, msDuration);
            }
        }


        // Keeping track of positions
        let disconnectObserver;
        {
            // Gather elements
            const sectionElem = document.getElementById("section--hero");
            if (!sectionElem) {
                return;
            }

            const mainElem = document.getElementById("section--hero__elem--main");
            if (!mainElem) {
                return;
            }

            // Create observer
            const observer = new ResizeObserver(() => {
                mainRect = mainElem.getBoundingClientRect();

                rects = new Array(elemsLength);
                for (let i = 0; i < elemsLength; ++i) {
                    rects[i] = elems[i].getBoundingClientRect();
                }
            });

            // Observe elements that could change the placement of the lines
            observer.observe(sectionElem);
            observer.observe(mainElem);
            for (let i = 0; i < elemsLength; ++i) {
                observer.observe(elems[i]);
            }

            disconnectObserver = observer.disconnect.bind(observer);
        }

        return disconnectObserver;
    });
</script>

{#snippet line(rectOne: DOMRect, rectTwo: DOMRect)}
    <line
        x1={rectOne.x + rectOne.width / 2} y1={rectOne.y + rectOne.height / 2}
        x2={rectTwo.x + rectTwo.width / 2} y2={rectTwo.y + rectTwo.height / 2}
    />
{/snippet}

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
        background-color: var(--green);
        border: 16px solid var(--green);
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
        position: relative;
        left: var(--offsetX, 0);
        top: var(--offsetY, 0);
        width: max-content;
        height: fit-content;
        padding-inline: 16px;
        padding-block: 8px;
        border: 16px solid var(--green);
        background-color: var(--dark-green);
        font-size: 32px;
        font-weight: 700;
        color: var(--light);
        animation: 300ms ease-in-out var(--animation-stage-one) both fade-in;
        transition:
            left 1500ms ease-in-out,
            top 1500ms ease-in-out;
    }

    :is(#section--hero__elem--two, #section--hero__elem--four) {
        justify-self: right;
    }

    svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        animation: 900ms ease-in-out var(--animation-stage-two) both circle-clip-in;
    }

    @keyframes circle-clip-in {
        from {
            clip-path: circle(0px at center);
        }

        to {
            clip-path: circle(500px at center);
        }
    }

    line {
        stroke: color-mix(in srgb, var(--light) 60%, transparent 40%);
        stroke-width: 4px;
        animation: 300ms ease-in-out var(--animation-stage-two) both fade-in;
    }
</style>
