<script lang="ts">
    const { children, ...rest } = $props();
</script>

<section class="section" {...rest}>
    <div class="section__content">
        {@render children?.()}
    </div>
</section>

<style>
    .section {
        contain: content;
    }

    .section__content {
        box-sizing: border-box;
        margin-inline: auto;
        max-width: 1920px;
        min-height: 90vh;
        padding-inline: var(--gap-128);
        padding-block: var(--gap-96) var(--gap-128);
    }
</style>
