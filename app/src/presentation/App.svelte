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
<div class="wip-notice">Early development</div>
<svg class="noise-overlay" aria-hidden="true">
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
    .noise-overlay {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0.075;
        pointer-events: none;
    }

    .wip-notice {
        --angle: 45deg;
        padding: 16px 64px;
        position: fixed;
        top: 0;
        left: 100%;
        font-size: 22px;
        font-weight: 500;
        letter-spacing: -5%;
        white-space: nowrap;
        background-color: var(--yellow);
        color: var(--dark);
        transform:
                translateX(calc(cos(var(--angle)) * 100% * -1)) /* Move left to perfectly fit it in the corner */
                translateY(-100%) /* Left-bottom anchored to top of page */
                rotate(var(--angle))
        ;
        transform-origin: left bottom;
        animation: 300ms ease-in-out var(--animation-stage-three) both fade-in;
    }
</style>