<script lang="ts">
    import HeroSection from "$lib/components/routes/home/hero/HeroSection.svelte";
    import FeaturesSection from "$lib/components/routes/home/features/FeaturesSection.svelte";
    import RoadmapSection from "$lib/components/routes/home/roadmap/RoadmapSection.svelte";
</script>

<main>
    <HeroSection/>
    <FeaturesSection/>
    <RoadmapSection/>
</main>
<svg class="effect-overlay" aria-hidden="true">
    <defs>
        <filter id="noise-filter">
            <feTurbulence
                type="fractalNoise"
                baseFrequency="0.5"
                numOctaves="1"
                stitchTiles="stitch"
            />
        </filter>

        <radialGradient 
            id="vignette"

            cx="50%"
            cy="50%"

            fr="50%"
            r="100%"
        >
            <stop offset="0%" stop-color="transparent"/>
            <stop offset="100%" stop-color="black" stop-opacity="0.6"/>
        </radialGradient>
    </defs>


    <g class="noise-effect">
        <rect 
            width="100%" 
            height="100%" 
            fill="#000000"
        />
        <rect 
            width="100%" 
            height="100%" 
            filter="url(#noise-filter)"
        />
    </g>

    <rect
        width="100%"
        height="100%"
        fill="url(#vignette)"
    />
</svg>
<div class="wip-notice">Early concept</div>

<style>
    .effect-overlay {
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .noise-effect {
        opacity: 0.075;
    }

    .wip-notice {
        --angle: 45deg;
        padding: var(--gap-16) var(--gap-64);
        position: fixed;
        top: 0;
        left: 100%;
        font-size: var(--font-size-16);
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