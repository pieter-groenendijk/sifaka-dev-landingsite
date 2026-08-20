<!--component

A vignette effect that slighly moves towards the mouse. The vignette is centered when the mouse is centered,
this is it's default state. The distance of possible movement is determined by the screen size, but perhaps
later limited to avoid large screen issues.

- First of all I need to determine center of the screen.
- Going to need to mouse position


-->

<script lang="ts">
  import { throttled } from "$lib/logic/perf/timing";

  const screen = $state({
    width: 0,
    height: 0,
  });
  const screenCenter = $derived({
    x: Math.trunc(screen.width / 2),
    y: Math.trunc(screen.height / 2),
  });

  const mousePos = $state({
    x: screenCenter.x,
    y: screenCenter.y,
  });
  const updateMousePos = throttled(100, (event: MouseEvent) => {
    mousePos.x = event.screenX;
    mousePos.y = event.screenY;
  });

  const vignetteOffset = $derived({
    x: Math.trunc((mousePos.x - screenCenter.x) * 0.2),
    y: Math.trunc((mousePos.y - screenCenter.y) * 0.2),
  });
  $inspect(vignetteOffset);
</script>


<svelte:window
  bind:innerWidth={screen.width}
  bind:innerHeight={screen.height}
  onmousemove={updateMousePos}
/>

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

      fr="40%"
      r="100%"
    >
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="60%" stop-color="black" stop-opacity="0.6"/>
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
    class="vignette-applier"
    x="-20%"
    y="-20%"
    width="140%"
    height="140%"
    fill="url(#vignette)"
    transform="translate({vignetteOffset.x}, {vignetteOffset.y})"
  />
</svg>



<style>
  .effect-overlay {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: var(--z-effects);
  }

  .noise-effect {
    opacity: 0.075;
  }

  .vignette-applier {
    transition: transform 200ms ease-out;
  }
</style>
