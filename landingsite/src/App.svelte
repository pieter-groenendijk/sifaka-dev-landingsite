<script lang="ts">
    import HeroSection from "./HeroSection.svelte";
    import ShowcaseSection from "./ShowcaseSection.svelte";
    import {createHandler, enable} from "./lib/input/handler";
    import {bindSequence} from "./lib/input/sequence";
    import {bindCombination} from "./lib/input/combination";

    const inputHandler = createHandler();
    // bindSequence(inputHandler, ["KeyQ", "KeyA"], () => {
    //     console.log("action!");
    // });
    bindCombination(inputHandler, ["KeyQ", "KeyA"], () => {
        console.log("action!");
    });
    enable(inputHandler);
</script>

<main>
    <HeroSection/>
    <ShowcaseSection/>
</main>
<svg><!-- Noise overlay -->
    <filter id="noise-filter">
        <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="1"
            stitchTiles="stitch"
        />
    </filter>

    <rect width="100%" height="100%" fill="#000000"/>
    <rect width="100%" height="100%" filter="url(#noise-filter)"/>
</svg>

<style>
    svg {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0.075;
        z-index: 1;
        pointer-events: none;
    }
</style>