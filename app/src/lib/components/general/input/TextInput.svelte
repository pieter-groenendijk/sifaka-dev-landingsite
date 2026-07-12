<!--
    @component A well-styled input field for text. This component may only communicate validation but does not validate it's input itself, this is possible done by it's parent.
-->
<script lang="ts">
    import "$lib/styling/interactions.css";

    let { 
        className = "",
        name, 
        placeholder, 
        attr, 
        value = $bindable(""), 
        isProcessing = false, 
        isGood = $bindable(undefined),
        message = $bindable(""),
        judge = (value: string) => {}, 
    }: {
        className?: string,
        name: string,
        placeholder: string,
        attr?: object,
        value?: string,
        isProcessing?: boolean,
        isGood?: boolean|undefined,
        message?: string,
        judge?: (value: string) => void,
    } = $props();

    let isJudged: boolean;
    let autoJudgeTimeoutId: number; 
    function onInput() {
        isGood = undefined;
        message = "";

        isJudged = false;


        clearTimeout(autoJudgeTimeoutId);
        autoJudgeTimeoutId = setTimeout(() => {
            isJudged = true;
            judge(value);
        }, 500);
    }

    function onChange() {
        clearTimeout(autoJudgeTimeoutId);
        if (!isJudged) {
            judge(value);
            isJudged = true;
        } 
    }
</script>


<div 
    class="interactable-wrapper input-wrapper pressable"
    class:interactable-wrapper--judging={isProcessing}
    class:interactable-wrapper--good={isGood !== undefined && isGood}
    class:interactable-wrapper--bad={isGood !== undefined && !isGood}
>
    <input 
        //class="input {className}"
        class="interactable {className}"

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
        position: relative;
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
        color: var(--color-dark);
        background-color: var(--color-light);
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