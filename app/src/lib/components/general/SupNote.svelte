<script lang="ts">
    import type { Snippet } from "svelte";

  let {
    tag = "div",
    children,
    ...attr
  }: {
    tag?: string
    children?: Snippet<[]>,
    [attr: string]: unknown,
  } = $props();
</script>


<svelte:element
  this={tag}
  class="sup-note"
  {...attr}
>{@render children?.()}</svelte:element>



<style>
  .sup-note {
    font-size: var(--font-size-14);
    font-weight: 300;
    color: var(--light);
    opacity: 0.7;
  }
</style>
