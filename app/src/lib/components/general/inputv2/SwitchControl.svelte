<script lang="ts">
    import { judge_IsDetermined, judge_State, type judge_Judgement } from "$lib/logic/validation/validation";
  import "./input.css";

  let {
    className,
    name,
    required,
    value = $bindable(),
    options,
    judgement,
    label,
    ...rest
  }: {
    className?: string,
    name: string,
    required?: boolean,
    value?: string,
    options: {
      list: {
        key: string,
        value: string,
      }[],
    },
    judgement: judge_Judgement,
    label: {
      label?: string,
      supplement?: string,
      hidden?: boolean,
    },
    [name: string]: unknown,
  } = $props();
</script>




<fieldset
  class="control toggle {className}"

  class:control--pending={judgement.State === judge_State.Pending}
  class:control--good={judgement.State === judge_State.Good}
  class:control--bad={judgement.State === judge_State.Bad}

  class:control--label-hidden={label.hidden}
>
  <legend>
    <div class="control-label">{label.label + (required ? " *" : "")}</div>
    <div class="control-supplement">{label.supplement}</div>
  </legend>

  <div class="toggle__select">
    {#each options.list as option}
      <label class="toggle__option">
        <div class="">{option.key}</div>
        <input
          {...rest}
          class="toggle__input"
          type="radio"
          required={required}
          value={option.value}
          bind:group={value}
        />
      </label>
    {/each}
  </div>

  {#if judge_IsDetermined(judgement) && judgement.Message.length !== 0}
    <div
      class="control-feedback"

      aria-live="polite"
    >{judgement.Message}</div>
  {/if}

</fieldset>



<style>
  .toggle {
    --text-padding-inline: var(--gap-12);
  }
  .control-label {
    margin-bottom: var(--gap-4);
    padding-inline: var(--text-padding-inline);
  }
  .control-supplement {
    margin-bottom: var(--gap-4);
    padding-inline: var(--text-padding-inline);
  }
  .toggle__select {
    --border-radius: var(--gap-8);
    overflow: visible;
    appearance: base-select;
    outline: 0px solid rgb(from var(--color) r g b / 0);
    border-radius: var(--border-radius);
    height: unset;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-12);
    background-color: rgb(from var(--color) r g b / 0.1);
    transition:
      border-radius 150ms ease-in-out,
      outline 100ms ease-in-out,
      font-weight 150ms ease-in-out,
      transform 70ms ease-in-out;

    &:hover:not(:has(.toggle__option:is(:hover, :focus-within))) {
      --border-radius: var(--gap-12);
      outline: 2px solid rgb(from var(--color) r g b / 0.8);
    }

    &:focus {
      --border-radius: var(--gap-12);
      outline: 4px solid var(--color);
    }

    &:active {
      transform: scale(.98);
    }
  }
  .toggle__option {
    flex: 1 0 0;
    outline: 0px solid rgb(from var(--color) r g b / 0);
    border-radius: var(--border-radius);
    padding: var(--gap-8) var(--gap-12);
    min-width: fit-content;
    min-height: unset;
    display: block;
    text-align: center;
    color: rgb(from var(--color) r g b / 0.5);
    font-weight: 400;
    transition:
      border-radius 150ms ease-in-out,
      background-color 150ms ease-in-out,
      outline 100ms ease-in-out,
      font-weight 150ms ease-in-out,
      color 150ms ease-in-out;

    &::checkmark {
      display: none;
    }

    &:hover {
      outline: 2px solid rgb(from var(--color) r g b / 0.8);
    }

    &:focus-within {
      outline: 4px solid var(--color);
    }

    &:has( :checked) {
      font-weight: 500;
      color: var(--color);
    }
  }
  .toggle__input {
    display: none;
  }
</style>
