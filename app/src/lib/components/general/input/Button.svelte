<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        className = "",
        outerClassName = "",
        isProcessing = false,
        isGood = undefined,
        ...attr
    }: {
        children?: Snippet,
        className?: string,
        outerClassName?: string,
        isProcessing?: boolean,
        isGood?: boolean | undefined,
        [key: string]: unknown,
    } = $props();
</script>


<div 
    class="interactable-wrapper pressable {outerClassName}"
    class:interactable-wrapper--judging={isProcessing}
    class:interactable-wrapper--good={isGood !== undefined && isGood}
    class:interactable-wrapper--bad={isGood !== undefined && !isGood}
>
    <button
        class="interactable {className}"
        disabled={isProcessing}
        {...attr}
    >{@render children?.()}</button>
</div>


<style>

</style>