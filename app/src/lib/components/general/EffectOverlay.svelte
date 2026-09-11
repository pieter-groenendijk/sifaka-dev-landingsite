<script lang="ts">
</script>


<svg class="effect-overlay noise-svg" aria-hidden="true">
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
  <g class="noise-applied">
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
</svg>
<svg class="effect-overlay vignette-svg" aria-hidden="true">
  <defs>
    <radialGradient
      id="vignette"

      cx="50%"
      cy="50%"

      fr="50%"
      r="100%"
    >
      <stop offset="00%" stop-color="transparent"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.6"/>
    </radialGradient>
  </defs>
  <rect
    class="vignette-applied"
    x="0%"
    y="0%"
    width="100%"
    height="100%"
    fill="url(#vignette)"
  />
</svg>



<style>
  .effect-overlay {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .noise-svg {
    z-index: var(--z-effects);
  }

  .vignette-svg {
    z-index: var(--z-main-effects);
  }

  .noise-applied {
    position: relative;
    opacity: 0.075;
  }

  .vignette-applied {
    transition: transform 400ms ease-out;
  }
</style>
