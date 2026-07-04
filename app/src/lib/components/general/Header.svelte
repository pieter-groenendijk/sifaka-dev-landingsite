<script lang="ts">
</script>


<header class="header">
    <div class="header__content">
        <button 
            class="logo"
            aria-label="Open/closes respective menu for more advanced navigation"
        >
            <span class="logo__bracket logo__bracket-1">&#123;</span><span class="logo__name">Sifaka.dev</span><span class="logo__bracket logo__bracket-2">&#125;</span>
        </button>
    </div>
</header>


<style>
    .header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
        background: linear-gradient(
            45deg, 
            rgb(from var(--dark) r g b / 0.3) -20%, 
            rgb(from var(--dark) r g b / 0) 40% 
        );
        animation: onScroll ease-in-out;
        animation-timeline: scroll(root block);
        animation-range: 0 150px;
        animation-fill-mode: both;
        backdrop-filter: blur(10px);
        contain: content;
    }
    .header__content {
        box-sizing: border-box;
        margin-inline: auto;
        padding-inline: var(--gap-128);
        padding-block: var(--gap-16);
    }

    @keyframes onScroll {
        from {
            font-size: var(--font-size-48);
        }

        to {
            font-size: var(--font-size-32);
        }
    }
    .logo {
        --spacing: 0.3ch;
        font-family: "Bricolage Grotesque";
        font-weight: 800;
        letter-spacing: -5%;
        color: var(--yellow);
        transition-property: transform;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
        transition-delay: 0;
        animation: onScroll ease-in-out;
        animation-timeline: scroll(root block);
        animation-range: 0 150px;
        animation-fill-mode: both;
    }
    .logo__name {
        display: inline-block;
        margin-left: var(--spacing);
        max-width: 200px;
        transition-property: opacity, font-stretch, margin-inline, max-width;
        transition-duration: 150ms, 200ms, 200ms, 200ms;
        transition-timing-function: ease-in-out;
        transition-delay: 150ms;
    }
    .logo__bracket {
        display: inline-block;
    }
    .logo__bracket-2 {
        margin-left: var(--spacing);
        transition-property: transform;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;
        transition-delay: 150ms;
    }
    .header:hover {
        & .logo {
            transform: rotate(-90deg);
            transition-delay: 150ms;
        }

        & .logo__name {
            margin-inline: 0;
            max-width: 0;
            font-stretch: 50%;
            opacity: 0;
            transition-delay: 0ms;
        }

        & .logo__bracket-2 {
            transform: scaleX(-1); 
            transition-delay: 0ms;
        }
    }
</style>