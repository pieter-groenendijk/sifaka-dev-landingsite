<script lang="ts">
</script>


<header class="header">
    <div class="header__content">
        <button 
            class="logo"
            aria-label="Open/closes respective menu for more advanced navigation"
        >
            <span class="logo__bracket-1">&#123;</span> <span class="logo__name">Sifaka.dev</span> <span class="logo__bracket-2">&#125;</span>
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
        font-family: "Bricolage Grotesque";
        font-size: var(--font-size-64);
        font-weight: 800;
        letter-spacing: -5%;
        color: var(--yellow);
    }
</style>