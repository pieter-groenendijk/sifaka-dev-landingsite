<script lang="ts" generics="value extends judge_Value">
  import { judge_State, judge_IsDetermined, type judge_Handler, type judge_Value, type judge_Judgement } from "$lib/logic/validation/validation";
  import "./input.css";

  let {
    className,
    type,
    name,
    required,
    value = $bindable(),
    placeholder,
    judgement,
    label = {
      hidden: false,
    },
    ...rest
  }: {
    className?: string,
    type: string,
    name: string,
    required?: boolean,
    value?: value,
    placeholder: string,
    judgement: judge_Judgement,
    label: {
      label?: string,
      supplement?: string,
      hidden?: boolean,
    },
    [key: string]: unknown,
  } = $props();
</script>



<label
  class="control text-input {className}"

  class:control--pending={judgement.State === judge_State.Pending}
  class:control--good={judgement.State === judge_State.Good}
  class:control--bad={judgement.State === judge_State.Bad}

  class:control--label-hidden={label.hidden}
>
  <div class="control-label">{label.label + (required ? " *" : "")}</div>
  <div class="control-supplement">{label.supplement}</div>

  <input
    class="control__input control-input control-value control-box"
    type={type}
    name={name}
    required={required}
    placeholder={placeholder}
    bind:value={value}
    {...rest}
  />

  {#if judge_IsDetermined(judgement) && judgement.Message.length !== 0}
    <div
      class="control-feedback"

      aria-live="polite"
    >{judgement.Message}</div>
  {/if}

</label>



<style>
  .control {
    --text-padding-inline: var(--gap-12);

    display: flex;
    flex-direction: column;
    gap: var(--gap-4);
  }
  .control-label {
    padding-inline: var(--text-padding-inline);
  }
  .control-supplement {
    padding-inline: var(--text-padding-inline);
  }
  .control-input {
    &::-webkit-calendar-picker-indicator {
      filter: invert(.8);
    }
  }
  .control-feedback {
    padding-inline: var(--text-padding-inline);
  }
</style>
