<script lang="ts">
  import "./input.css";

  let {
    type,
    name,
    value = $bindable(""),
    placeholder,
    judgement,
    label = {
      hidden: false,
    },
  }: {
    type: string,
    name: string,
    value?: string,
    placeholder: string,
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
</script>



<label
  class="control"
  class:control--processing={judgement.isProcessing}
  class:control--good={judgement.isGood === true}
  class:control--bad={judgement.isGood === false}
  class:control--label-hidden={label.hidden}
>
  <div class="control-label">{label.label}</div>
  <div class="control-supplement">{label.supplement}</div>
  <input
    class="control__input control-value"
    type={type}
    name={name}
    placeholder={placeholder}
    disabled={judgement.isProcessing}
    bind:value={value}
  />
</label>



<style>
  .control {
    --text-padding-inline: var(--gap-12);
    --color: var(--yellow);
    --color-bad: var(--red);
    --color-green: var(--green);
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
  .control__input {
    box-sizing: border-box;
    outline: 0px solid rgb(from var(--yellow) r g b / 0);
    border-radius: var(--gap-8);
    padding: var(--gap-8) var(--text-padding-inline);
    width: 100%;
    field-sizing: content;
    background-color: rgb(from var(--yellow) r g b / 0.1);
    transition:
      border-radius 150ms ease-in-out,
      outline 100ms ease-in-out,
      font-weight 150ms ease-in-out,
      transform 70ms ease-in-out;
  }
  .control__input::placeholder {
    font-weight: 400;
    color: rgb(from var(--yellow) r g b / 0.4);
  }

  .control:has(.control__input:disabled) {
    filter: blur(2px);
    cursor: not-allowed;
  }

  .control:hover .control__input:not(:disabled) {
    outline: 2px solid rgb(from var(--yellow) r g b / 0.8);
    border-radius: var(--gap-12);
  }

  .control:focus-within .control__input:not(:disabled) {
    outline: 4px solid var(--yellow);
    border-radius: var(--gap-12);
    font-weight: 500;
  }

  .control__input:active:not(:disabled) {
    transform: scale(.96);
  }
</style>
