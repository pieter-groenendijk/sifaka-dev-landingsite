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
        z-index: 1;
    }
    .header__content {
        box-sizing: border-box;
        margin-inline: auto;
        padding-inline: var(--gap-128);
        padding-block: var(--gap-16);
    }

    .logo {
        --spacing: 0.3ch;
        font-family: "Bricolage Grotesque";
        font-size: var(--font-size-48);
        /* font-size: var(--font-size-32); */
        font-weight: 800;
        letter-spacing: -5%;
        color: var(--yellow);
        transition: transform 300ms 300ms ease-in-out;
    }
    .logo__name {
        display: inline-block;
        margin-left: var(--spacing);
        max-width: 200px;
        transition: 
            opacity 200ms ease-in-out,
            font-stretch 200ms ease-in-out,
            margin-inline 300ms ease-in-out,
            max-width 300ms ease-in-out
            ;
    }
    .logo__bracket {
        display: inline-block;
        transition:
            transform 200ms ease-in-out;
    }
    .logo__bracket-2 {
        margin-left: var(--spacing);
    }
    .header:hover {
        & .logo {
            transform: rotate(-90deg);
        }

        & .logo__name {
            margin-inline: 0;
            max-width: 0;
            font-stretch: 50%;
            opacity: 0;
        }

        & .logo__bracket-2 {
            transform: scaleX(-1);
        }
    }
</style>