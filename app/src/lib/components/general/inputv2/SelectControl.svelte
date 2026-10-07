<script lang="ts">
    import { judge_IsDetermined, judge_State, type judge_Judgement } from "$lib/logic/validation/validation";

  let {
    className,
    name,
    required,
    value = $bindable(""),
    options,
    judgement,
    label,
    ...rest
  }: {
    className?: string,
    name: string,
    value?: string,
    options: {key: string, value: string}[],
    judgement: judge_Judgement,
    label: {
      label?: string,
      supplement?: string,
      hidden?: boolean,
    },
    required?: boolean,
    [name: string]: unknown,
  } = $props();

  $effect(() => {
    console.log(value);
  });
</script>



<label
  class="control select {className}"

  class:control--pending={judgement.State === judge_State.Pending}
  class:control--good={judgement.State === judge_State.Good}
  class:control--bad={judgement.State === judge_State.Bad}

  class:control--label-hidden={label.hidden}
>

  <div class="control-label">{label.label + (required ? " *" : "")}</div>
  <div class="control-supplement">{label.supplement}</div>

  <select
    {...rest}
    class="select__input control-value"
    class:control-value--placeholder={value === ""}

    name={name}
    required={required}
    bind:value={value}
  >
    <!-- bind:value={value} -->
    <option class="select__option select__option--placeholder" value="" disabled>Select</option>

    {#each options as option}
      <option
        class="select__option"
        value={option.value}
      >{option.key}</option>
    {/each}
  </select>

  {#if judge_IsDetermined(judgement) && judgement.Message.length !== 0}
    <div
      class="control-feedback"

      aria-live="polite"
    >{judgement.Message}</div>
  {/if}

</label>



<style>
  .select {
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
  .select__input {
    --border-radius: var(--gap-8);
    appearance: base-select;

    outline: 0px solid rgb(from var(--color) r g b / 0);
    border-radius: var(--border-radius);
    height: unset;
    padding: var(--gap-8) var(--gap-12);

    position: relative;
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-12);
    background-color: rgb(from var(--color) r g b / 0.1);

    transition:
      border-radius 150ms ease-in-out,
      outline 100ms ease-in-out,
      font-weight 150ms ease-in-out,
      background-color 150ms ease-in-out,
      color 150ms ease-in-out,
      transform 70ms ease-in-out;

    &:hover:not(:has(.toggle__option:is(:hover, :focus-within))) {
      --border-radius: var(--gap-12);
      outline: 2px solid rgb(from var(--color) r g b / 0.8);
    }

    &:focus {
      --border-radius: var(--gap-12);
      outline: 4px solid var(--color);
    }

    &::picker(select) {
      appearance: base-select;
      margin-block: var(--gap-8);
      border: none;
      padding: var(--gap-4);
      border-radius: calc(var(--gap-12) + var(--gap-4));
      display: flex;
      flex-direction: column;
      gap: var(--gap-4);
      background-color: rgb(from var(--brown) r g b / 0.95);
      transition: opacity 150ms ease-in-out;
    }

    & option {
      outline: 0px solid rgb(from var(--yellow) r g b / 0);
      min-height: unset;
      border-radius: var(--gap-12);
      padding: var(--gap-8) var(--gap-12);
      line-height: 100%;
      color: rgb(from var(--yellow) r g b / 0.5);
      font-weight: 400;
      contain: inline-size;
      transition:
        outline 100ms ease-in-out,
        font-weight 150ms ease-in-out,
        color 150ms ease-in-out;

      &::checkmark {
        display: none;
      }

      &:hover {
        outline: 2px solid rgb(from var(--yellow) r g b / 0.8);
      }

      &:focus-within {
        outline: 4px solid var(--yellow);
      }

      &:checked {
        font-weight: 500;
        color: var(--yellow);
      }
    }

    &:open .select__option--placeholder {
      display: none;
    }
  }
</style>
