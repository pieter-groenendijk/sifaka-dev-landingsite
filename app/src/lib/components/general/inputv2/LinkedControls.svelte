<script lang="ts">
    import type { Snippet } from "svelte";
  import TextControl from "./TextControl.svelte";
  import "./input.css";

  let {
    className,
    label = {
      hidden: false,
    },
    leftControl,
    rightControl,
  }: {
    className?: string,
    label: {
      label?: string,
      supplement?: string,
      hidden?: boolean,
    },
    leftControl: Snippet,
    rightControl: Snippet,
  } = $props();
</script>



<fieldset class="linked-control control {className}">
  <legend class="linked-control__legend">
    <span class="linked-control__label control-label">{label.label}</span>
    <span class="linked-control__supplement control-supplement">{label.supplement}</span>
  </legend>
  <div class="linked-control__list">
    {@render leftControl()}
    <span class="control__input-delimiter">=</span>
    {@render rightControl()}
  </div>
</fieldset>



<style>
  .linked-control {
    --text-inline-padding: var(--gap-12);
  }
  .linked-control__label,
  .linked-control__supplement {
    margin-bottom: var(--gap-4);
    padding-inline: var(--gap-12);
    display: block;
  }
  .linked-control__list {
    display: flex;
    align-items: center;
    column-gap: var(--gap-4);
  }
  :global(.control--end-date) {
    flex: 2 0 0;
  }
  .control__input-delimiter {
    font-size: var(--font-size-14);
    font-weight: 450;
    color: var(--yellow);
  }
  :global(.control--duration) {
    flex: 1 0 0;
  }
</style>
