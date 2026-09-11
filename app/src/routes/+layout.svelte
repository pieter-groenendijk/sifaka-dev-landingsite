<script module lang="ts">
  export const pageBgClr: {css: string} = $state(Object.seal({css: "var(--green)"}));
</script>


<script lang="ts">
  import EffectOverlay from "$lib/components/general/EffectOverlay.svelte";
  import Footer from "$lib/components/general/Footer.svelte";
  import Header from "$lib/components/general/Header.svelte";
  import GlobalMessageFeed from "$lib/components/general/input/message-feed/MessageFeed.svelte";
  import "./critical.css";
  import "./global.css";

  let { children } = $props();
</script>


<svelte:head>
  <!-- Branding -->
  <title>Sifaka.dev › Database design without grunt work</title>
  <meta name="description" content="Pragmatic database design for MongoDB, PostgreSQL and other platforms. A time-efficient, easy-to-use tool that translates intent into implementation."/>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

    <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&display=swap" rel="stylesheet">
</svelte:head>


<div class="page" style="background-color: {pageBgClr.css}">
  <Header/>
  <!-- <main> should be placed by the page itself -->
  {@render children()}
  <Footer/>
</div>
<GlobalMessageFeed/>
<EffectOverlay/>
<div class="wip-notice">Early concept</div>


<style>
  :root {
    --z-below: -1;
    --z-main: 0;
    --z-main-effects: 1;
    --z-above: 2;
    --z-above-2: 3;
    --z-effects: 4;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  :global(main) {
    flex: 1 0 80vh;
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
    z-index: var(--z-effects);
    animation: 300ms ease-in-out var(--animation-stage-three) both fade-in;
  }
</style>
