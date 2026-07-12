<script lang="ts">
    import Button from "./Button.svelte";

    let {
        className = "",
        isProcessing = false,
        isGood = $bindable(undefined),
        ...attr
    }: {
        className?: string,
        isProcessing?: boolean,
        isGood?: boolean | undefined,
        [key: string]: unknown,
    } = $props();

    const text = $derived.by(() => {
        if (isGood === undefined) {
            return "➔";
        }

        setTimeout(() => {
            isGood = undefined;
        }, 5000);

        if (isGood) {
            return ":)";
        } else {
            return ":(";
        }
    });

</script>


<Button
    className={className}
    isProcessing={false}
    isGood={isGood}
    type="submit"
    {...attr}
>{text}</Button>