<script lang="ts">
</script>


<div class="header-wrapper">
    <header class="header">
        <nav class="header__content">
            <div class="begin">
                <button
                    class="logo"
                    aria-label="Open/closes respective menu for more advanced navigation"
                >
                    <span class="logo__bracket logo__bracket-1">&#123;</span><span class="logo__name">Sifaka.dev</span><span class="logo__bracket logo__bracket-2">&#125;</span>
                </button>
            </div>
            <div class="center nav-links">
                <a class="nav-link" href="/about">About</a>
                <a class="nav-link" href="/pricing">Pricing</a>
            </div>
            <div class="end">

            </div>
        </nav>
    </header>
</div>


<style>
    @keyframes headerOnScroll {
        from {
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0);
        }
        to {
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        }
    }
    .header-wrapper {
        position: sticky;
        top: 0;
        z-index: var(--z-above);
        height: var(--gap-96);
    }
    .header {
        --on-scroll-range: 150px;
        position: relative;
        width: 100%;
        animation:
            fade-in 300ms var(--animation-stage-two) ease-in-out both,
            headerOnScroll ease-in-out both;
        animation-timeline:
            auto,
            scroll(root block);
        animation-range: 0 150px;
        backdrop-filter: blur(5px);
    }
    @keyframes headerBgOnScroll {
        from {
            transform: translateX(-30%);
        }
        to {
            transform: translateX(0%);
        }
    }
    .header::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(
            45deg,
            rgb(from var(--light) r g b / 0.15) 0%,
            rgb(from var(--light) r g b / 0) 30%,
            rgb(from var(--light) r g b / 0.10) 50%,
            rgb(from var(--light) r g b / 0) 60%
        );
        animation: headerBgOnScroll ease-in-out;
        animation-timeline: scroll(root block);
        animation-range: 0 150px;
    }
    .header__content {
        box-sizing: border-box;
        margin-inline: auto;
        padding-inline: var(--gap-128);
        padding-block: var(--gap-16);
        display: flex;
        justify-content: center;
        gap: var(--gap-32);
    }
    .end, .begin {
        flex: 1 1 0;
    }

    @keyframes logoOnScroll {
        from {
            font-size: var(--font-size-32);
        }

        to {
            font-size: var(--font-size-22);
        }
    }
    .logo {
        --spacing: 0.3ch;
        font-family: "Bricolage Grotesque";
        font-weight: 800;
        letter-spacing: -5%;
        text-shadow: 0 0 5px rgb(from var(--dark-green) r g b / 0.5);
        color: var(--yellow);
        transition-property: transform;
        transition-duration: 200ms;
        transition-timing-function: ease-in-out;
        transition-delay: 0ms;
        animation: logoOnScroll ease-in-out;
        animation-timeline: scroll(root block);
        animation-range: 0 var(--on-scroll-range);
        animation-fill-mode: both;
        cursor: default;
        text-wrap: nowrap;
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
        transition-property: transform, margin-left;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;
        transition-delay: 150ms;
    }
    .begin:hover {
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
            margin-left: 0.14ch;
            transform: scaleX(-1);
            transition-delay: 0ms;
        }
    }

    @keyframes navLinksOnScroll {
        from {
            font-size: var(--font-size-20);
            font-weight: 600;
        }
        to {
            font-size: var(--font-size-18);
            font-weight: 550;
        }
    }
    .nav-links {
        align-self: center;
        display: flex;
        gap: var(--gap-32);
        animation: navLinksOnScroll both ease-in-out;
        animation-timeline: scroll(root block);
        animation-range: 0 var(--on-scroll-range);
    }
    .nav-link {
        position: relative;
        font-family: "Bricolage Grotesque";
        font-stretch: 100%;
        text-decoration: none;
        text-shadow: 0 0 5px rgb(from var(--dark-green) r g b / 0.5);
        color: var(--light);
        transition: transform 200ms ease-in-out;

        &::before {
            content: "/";
            position: absolute;
            right: calc(100% + 0.1ch);
            opacity: 0;
            transition: opacity 200ms ease-in-out;
        }
    }
    .nav-link:hover {
        transform: translateX(0.5ch);
        transition: transform 200ms ease-in-out;

        &::before {
            transform: translateX(0);
            opacity: 1;
            transition: opacity 200ms ease-in-out;
        }
    }
</style>
