<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        className = "",
        ...attr
    }: {
        children?: Snippet,
        className?: string,
        [key: string]: unknown,
    } = $props();
</script>


<div class="interactable-wrapper pressable">
    <button
        class="interactable {className}"
        {...attr}
    >{@render children?.()}</button>
</div>


<style>

</style>