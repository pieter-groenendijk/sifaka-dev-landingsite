<script lang="ts">
    import Footer from "$lib/components/general/Footer.svelte";
    import Header from "$lib/components/general/Header.svelte";

    let { children } = $props();

    import "./critical.css";
    import "./global.css";
</script>


<svelte:head>
    <!-- SEO -->
    <title>Sifaka.dev › Database design without grunt work</title>
    <meta name="description" content="Pragmatic database design for MongoDB, PostgreSQL and other platforms. A time-efficient, easy-to-use tool that translates intent into implementation."/>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap" rel="stylesheet">
</svelte:head>

<Header/>
<main>
    {@render children()}
</main>
<Footer/>

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
        z-index: 2;
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
        background-color: var(--light);
        color: var(--dark);
        transform:
                translateX(calc(cos(var(--angle)) * 100% * -1)) /* Move left to perfectly fit it in the corner */
                translateY(-100%) /* Left-bottom anchored to top of page */
                rotate(var(--angle));
        transform-origin: left bottom;
        z-index: 3;
        animation: 300ms ease-in-out var(--animation-stage-three) both fade-in;
    }
</style>
