<script lang="ts">
  import { genId } from "$lib/logic/id/id";
import "./input.css";
  import type { Snippet } from "svelte";

  let {
    className,
    children,
    label,
    name,
    value = $bindable(),
    placeholder = "",
    judgement,
  }: {
    className?: string,
    children?: Snippet<[]>,
    label: {
      label?: string,
      supplement?: string,
      picker?: string,
      hidden?: boolean,
    },
    name: string,
    value: string,
    placeholder?: string,
    judgement: {
      judge?: (() => {}),
      isProcessing: boolean,
      isGood?: boolean,
      message?: string,
    },
  } = $props();

  const buttonId = genId();
</script>



<label
  class="picker control {className}"
  class:picker--picked={value !== ""}
  class:control--processing={judgement.isProcessing}
  class:control--good={judgement.isGood === true}
  class:control--bad={judgement.isGood === false}
  class:control--label-hidden={label.hidden}
  for={buttonId}
>
  <div class="picker__label control-label">{label.label}</div>
  <div class="picker__supplement control-supplement">{label.supplement}</div>
  <div class="picker__interactive">
    <div class="picker__value-wrapper control-value">
      <span class="picker__value-symbol" aria-hidden="true">⚯ </span>
      <input
        id="account-username-input"
        class="picker__value control-value"
        type="text"
        name={name}
        readonly
        bind:value={value}
        placeholder={placeholder}
      />
    </div>
    <button
      id={buttonId}
      type="button"
      class="picker__picker"
      aria-controls="account-username-input"
      onclick={() => value = "Compjeuter"}
    >{label.picker ?? "Change"}</button>
  </div>
</label>



<style>
  .picker {
    --text-padding-inline: var(--gap-12);
    display: block;
  }
  .picker__label {
    padding-inline: var(--text-padding-inline);
  }
  .picker__supplement {
    padding-inline: var(--text-padding-inline);
  }
  .picker__interactive {
    box-sizing: border-box;
    outline: 0px solid rgb(from var(--yellow) r g b / 0);
    border-radius: var(--gap-8);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-12);
    background-color: rgb(from var(--yellow) r g b / 0.1);
    transition:
      border-radius 150ms ease-in-out,
      outline 100ms ease-in-out,
      font-weight 150ms ease-in-out,
      transform 70ms ease-in-out;

    &:hover {
      outline: 2px solid rgb(from var(--yellow) r g b / 0.8);
    }

    &:focus-within {
      outline: 4px solid var(--yellow);
    }
  }
  .picker__value-wrapper {
    flex: 1 0 0;
    padding: var(--gap-8) var(--text-padding-inline);
  }
  .picker__value-symbol {
    display: none;
    line-height: 0;
  }
  .picker--picked .picker__value-symbol {
    display: inline;
  }
  .picker__value {
    field-sizing: content;
  }
  .picker__value::placeholder {
    font-weight: 400;
    color: rgb(from var(--yellow) r g b / 0.5);
  }
  .picker__picker {
    flex: 1 0 0;
    border-radius: var(--gap-8);
    padding: var(--gap-8) var(--gap-16);
    box-shadow: 0 0 0px 0px var(--yellow);
    background-color: rgb(from var(--yellow) r g b / 1);
    font-size: var(--font-size-18);
    font-weight: 500;
    text-transform: capitalize;
    text-align: center;
    white-space: nowrap;
    color: var(--dark-green);
    text-shadow: 0px 0px 0px rgb(from var(--brown) r g b / 0);
    transition:
      box-shadow 100ms ease-in-out,
      border-radius 100ms ease-in-out,
      color 200ms ease-in-out;
  }
  .picker__picker:hover {
    box-shadow: 0 0 4px 3px var(--yellow);
    text-shadow: 0px 0px 0px rgb(from var(--brown) r g b / 0.3);
    border-radius: var(--gap-12);
    color: var(--brown);
  }
</style>
