<script lang="ts">
    const { children, ...rest } = $props();
</script>

<section class="section" {...rest}>
    <div class="section__content">
        {@render children?.()}
    </div>
</section>

<style>
    .section__content {
        box-sizing: border-box;
        margin-inline: auto;
        max-width: 1920px;
        min-height: 90vh;
        padding-inline: 128px;
        padding-block: 96px 128px;
    }
</style>
