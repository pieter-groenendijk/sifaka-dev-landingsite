<script lang="ts">
    import HeroSection from "./hero/HeroSection.svelte";
    import FeaturesSection from "./features/FeaturesSection.svelte";
    import RoadmapSection from "./roadmap/RoadmapSection.svelte";
</script>

<main>
    <HeroSection/>
    <FeaturesSection/>
    <RoadmapSection/>
</main>
<svg>
    <defs>
        
        <filter id="noise-filter">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.5"
                numOctaves="1"
                stitchTiles="stitch"
            />
        </filter>
    </defs>

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