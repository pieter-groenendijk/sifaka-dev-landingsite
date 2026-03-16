<script lang="ts">
    const { children, ...attributes } = $props();
</script>

<h2 class="h2" {...attributes}>{@render children?.()}</h2>

<style>
    h2 {
        font-size: var(--font-size-48);
        font-weight: 800;
    }
</style>