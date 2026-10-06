<script lang="ts">
  import type { Snippet } from "svelte";
  import "./input.css";
  import { judge_IsDetermined, judge_State, type judge_Judgement } from "$lib/logic/validation/validation";

  let {
    className,
    label = {
      hidden: false,
    },
    judgement,

    leftControl,
    rightControl,
  }: {
    className?: string,
    label: {
      label?: string,
      supplement?: string,
      hidden?: boolean,
    },
    judgement: judge_Judgement,

    leftControl: Snippet,
    rightControl: Snippet,
  } = $props();
</script>



<fieldset
  class="linked-control control {className}"
  class:control--pending={judgement.State === judge_State.Pending}
  class:control--good={judgement.State === judge_State.Good}
  class:control--bad={judgement.State === judge_State.Bad}
>

  <legend class="linked-control__legend">
    <span class="linked-control__label control-label">{label.label}</span>
    <span class="linked-control__supplement control-supplement">{label.supplement}</span>
  </legend>

  <div class="linked-control__list">
    {@render leftControl()}
    <span class="control__input-delimiter">=</span>
    {@render rightControl()}
  </div>

  {#if judge_IsDetermined(judgement) && judgement.Message.length !== 0}
    <div
      class="control-feedback"

      aria-live="polite"
    >{judgement.Message}</div>
  {/if}

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
  .control__input-delimiter {
    font-size: var(--font-size-14);
    font-weight: 450;
    color: var(--color);
    transition: color 150ms ease-in-out;
  }
  .control-feedback {
    margin-top: var(--gap-4);
    padding-inline: var(--text-inline-padding);
  }
</style>
