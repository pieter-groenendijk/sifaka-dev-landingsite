<script lang="ts">
  import "./input.css";
  import type { Snippet } from "svelte";

  let {
    children,
    label,
    value = $bindable(),
  }: {
    children?: Snippet<[]>,
    label: {
      label?: string,
      supplement?: string,
      hidden?: boolean,
    },
    value: string,
    judgement: {
      judge?: (() => {}),
      isProcessing: boolean,
      isGood?: boolean,
      message?: string,
    },
  } = $props();
</script>



<label class="picker control">
  <div class="picker__label control-label">Account</div>
  <div class="picker__supplement control-supplement">Licenses being purchased will be coupled to the currently logged in account.</div>
  <div class="picker__interactive">
    <div class="picker__value-wrapper control-value">
      ⚯
      <input
        id="account-username-input"
        class="picker__value control-value"
        type="text"
        name="username"
        readonly
        value="Compjeuter"
        placeholder=""
      />
    </div>
    <button
      class="picker__picker"
      aria-controls="account-username-input"
    >Log in / Sign Up</button>
  </div>
</label>



<style>
  .picker {
    --text-padding-inline: var(--gap-12);
    max-width: 500px;
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
    background-color: rgb(from var(--yellow) r g b / 0.1);
    transition:
      border-radius 150ms ease-in-out,
      outline 100ms ease-in-out,
      font-weight 150ms ease-in-out,
      transform 70ms ease-in-out;
  }
  .picker__value-wrapper {
    flex: 1 0 0;
    padding: var(--gap-8) var(--text-padding-inline);
  }
  .picker__value {
    field-sizing: content;
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
    /*color: var(--yellow);*/
    text-shadow: 0px 0px 0px rgb(from var(--brown) r g b / 0);
    /*text-decoration: 2px solid underline;*/
    /*text-underline-offset: 1px;*/
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
