<!--
    @component A well-styled input field for text. This component may only communicate validation but does not validate it's input itself, this is possible done by it's parent.
-->
<script lang="ts">
    let { 
        className = "",
        name, 
        placeholder, 
        attr, 
        value = $bindable(), 
        isProcessing = false, 
        isGood = $bindable(undefined),
        message = $bindable(""),
        judge = (value: string) => {}, 
    }: {
        className?: string,
        name: string,
        placeholder: string,
        attr?: object,
        value: string,
        isProcessing: boolean,
        isGood?: boolean|undefined,
        message?: string,
        judge: (value: string) => void,
    } = $props();

    let autoJudgeTimeoutId: number; 
    function onInput() {
        isGood = undefined;
        message = "";

        clearTimeout(autoJudgeTimeoutId);
        autoJudgeTimeoutId = setTimeout(() => {
            judge(value);
        }, 800);
    }

    function onChange() {
        judge(value);
    }
</script>


<div 
    class="input-wrapper"
    class:input--processing={isProcessing}
    class:input--good={isGood !== undefined && isGood}
    class:input--bad={isGood !== undefined && !isGood}
>
    <input 
        class="input {className}"

        name={name}
        type="text"
        placeholder={placeholder}
        bind:value={value}
        
        disabled={isProcessing}
        oninput={onInput}
        onchange={onChange}

        {...attr}
    />
    {#if !isProcessing}
        <div class="input__message" aria-live="polite">{message}</div>
    {/if}
</div>


<style>
    .input-wrapper {
        --border-width: 2px;
        --border-radius: var(--gap-8);
        --highlight-color: var(--yellow);
        --background-color: var(--brown);
        position: relative;
    }

    .input {
        box-sizing: border-box;
        outline: var(--border-width) solid var(--highlight-color);
        border-radius: var(--border-radius);
        height: var(--control-height);
        padding-inline: var(--gap-16);
        font-size: var(--font-size-16);
        font-weight: 500;
        color: var(--highlight-color);
        background-color: var(--background-color);
        transition: 
            outline 100ms ease-in-out,
            border-width 100ms ease-in-out,
            border-radius 100ms ease-in-out,
            background-color 100ms ease-in-out,
            color 100ms ease-in-out;
    }
    .input::placeholder {
        font-weight: 450;
        color: rgb(from var(--highlight-color) r g b / 0.7);
    }
    .input--processing {
        --border-width: 2px;
        --border-radius: calc(var(--gap-8) * 0.8);
        --highlight-color: var(--yellow);
        --background-color: rgb(from var(--yellow) r g b / 0.3);
        cursor: not-allowed;
    }
    .input--good {
        --border-width: 2px;
        --border-radius: calc(var(--gap-8) * 0.8);
        --highlight-color: var(--green);
        --background-color: rgb(38, 64, 57);
    }
    .input--bad {
        --border-width: 2px;
        --border-radius: calc(var(--gap-8) * 0.8);
        --highlight-color: #CD726A; 
        --background-color: #402626; 
    }
    /* active */
    :has( .input:where(:focus-within, :hover)) {
        --border-width: 4px;
        --border-radius: calc(var(--gap-8) * 1.4);
    }

    .input__message {
        position: absolute;
        left: 0;
        right: 0;
        margin-inline: var(--gap-8);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        padding: 2px var(--gap-16);
        font-size: var(--font-size-14);
        font-weight: 450;
        color: var(--background-color);
        background-color: var(--highlight-color);
        transition:
            border-radius 100ms ease-in-out,
            background-color 100ms ease-in-out,
            color 100ms ease-in-out,
            height 300ms ease-in-out
            ;
    }
    .input__message:empty {
        display: none;
    }
</style>