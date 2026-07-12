<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        children,
        className = "",
        isProcessing = false,
        isGood = undefined,
        ...attr
    }: {
        children?: Snippet,
        className?: string,
        isProcessing?: boolean,
        isGood?: boolean | undefined,
        [key: string]: unknown,
    } = $props();
</script>


<div 
    class="interactable-wrapper pressable"
    class:interactable-wrapper--judging={isProcessing}
    class:interactable-wrapper--good={isGood !== undefined && isGood}
    class:interactable-wrapper--bad={isGood !== undefined && !isGood}
>
    <button
        class="interactable interactable--alt {className}"
        {...attr}
    >{@render children?.()}</button>
</div>


<style>

</style>