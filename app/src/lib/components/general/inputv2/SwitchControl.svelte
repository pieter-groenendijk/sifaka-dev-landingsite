<script lang="ts">
  import "./input.css";

  let {
    name,
    value = $bindable(""),
    options,
    judgement,
    label,
  }: {
    name: string,
    value?: string,
    options: {
      list: {
        key: string,
        value: string,
      }[],
      default?: string,
    },
    judgement: {
      judge?: (() => {}),
      isProcessing: boolean,
      isGood?: boolean,
      message?: string,
    },
    label: {
      label?: string,
      supplement?: string,
      hidden?: boolean,
    },
  } = $props();

  $effect(() => {
    console.log(value);
  })
</script>




<label
  class="control toggle"
  class:control--processing={judgement.isProcessing}
  class:control--good={judgement.isGood === true}
  class:control--bad={judgement.isGood === false}
  class:control--label-hidden={label.hidden}
>
  <div class="control-label">{label.label}</div>
  <div class="control-supplement">{label.supplement}</div>
  <select
    class="toggle__select"
    size="2"
    bind:value={value}
    required
  >
    {#each options.list as option}
      <option
        class="toggle__option control-value"
        value={option.value}
      >{option.key}</option>
    {/each}
  </select>
</label>



<style>
  .toggle {
    --text-padding-inline: var(--gap-12);
    margin-bottom: var(--gap-32);
    width: 300px;

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
  .toggle__select {
    --border-radius: var(--gap-8);
    appearance: base-select;
    outline: 0px solid rgb(from var(--yellow) r g b / 0);
    border-radius: var(--border-radius);
    height: unset;
    position: relative;
    display: flex;
    gap: var(--gap-4);
    isolation: isolate;
    background-color: rgb(from var(--yellow) r g b / 0.1);
    anchor-scope: --toggled-option;
    transition:
      border-radius 150ms ease-in-out,
      outline 100ms ease-in-out,
      font-weight 150ms ease-in-out,
      transform 70ms ease-in-out;

    &::before {
      content: "";
      anchor-name: --toggled-option;
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      bottom: 0;
    }

    &::after {
      --offset: 2px;
      content: "";
      position-anchor: --toggled-option;
      position: absolute;
      left: anchor(left);
      right: anchor(right);
      top: anchor(top);
      bottom: anchor(bottom);
      border-radius: var(--border-radius);
      background-color: var(--yellow);
      z-index: -1;
      transition: inset 150ms ease-in-out;
    }

    /*&:not(:has(.toggle_option:checked))::before {
      top: anchor(bottom);
      position-anchor: --no-toggled-option;
    }*/

    &:hover {
      --border-radius: var(--gap-12);
      outline: 2px solid rgb(from var(--yellow) r g b / 0.8);
    }

    &:focus-within {
      --border-radius: var(--gap-12);
      outline: 4px solid var(--yellow);
    }

    &:active {
      /* transform currently bugs out with anchor position */
      /*transform: scale(.96);*/
    }
  }
  .toggle__option {
    flex-grow: 1;
    outline: 0px solid rgb(from var(--yellow) r g b / 0);
    border-radius: var(--border-radius);
    padding: var(--gap-8) var(--gap-12);
    min-height: unset;
    display: block;
    text-align: center;
    transition:
      border-radius 150ms ease-in-out,
      outline 100ms ease-in-out,
      color 300ms ease-in-out;

    &:hover {
      background-color: rgb(from var(--yellow) r g b / 0.1);
      /*outline: 2px solid rgb(from var(--yellow) r g b / 0.8);*/
    }

    &:focus-within {
      /*outline: 4px solid var(--yellow);*/
    }

    &::checkmark {
      display: none;
    }

    &:checked {
      anchor-name: --toggled-option;
      color: var(--brown);
    }
  }
</style>
