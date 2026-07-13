{#snippet renderMessage(message: Snippet, className: string)}
    <div
        class="interactable-wrapper message__content {className}"
    >
        <div 
            class="interactable"
            aria-live="polite"
        >{@render message()}</div>
    </div>
{/snippet}

{#snippet renderNeutral(message: Snippet)}
    {@render renderMessage(message, "")}
{/snippet}

{#snippet renderBad(message: Snippet)}
    {@render renderMessage(message, "interactable-wrapper--bad")}
{/snippet}

{#snippet renderGood(message: Snippet)}
    {@render renderMessage(message, "interactable-wrapper--good")}
{/snippet}

<script module lang="ts">
    import type { Snippet } from 'svelte';
    import { fade } from 'svelte/transition';

    export interface MessageFeedMessage {
        id: number,
        render: Snippet,
    }

    export { renderNeutral, renderBad, renderGood };

    export interface MessageFeed {
        messages: MessageFeedMessage[],
    }

    let lastId = 0;
    export function messfeed_Add(mf: MessageFeed, render: Snippet): number {
        const id = ++lastId;
        mf.messages.push(Object.seal({
            id: id,
            render,
        }));

        return id;
    }

    export function messfeed_Remove(mf: MessageFeed, id: number): void {
        const at = mf.messages.findIndex(message => message.id === id);
        if (at === -1) {
            return;
        }

        mf.messages.splice(at, 1);
    }

    export const globalMessageFeed: MessageFeed = $state(Object.seal({
        messages: [],
    }));
</script>



<script lang="ts">
    import Button from "../Button.svelte";

    const { feed = globalMessageFeed }: { feed?: MessageFeed } = $props();
</script>


<ol class="feed">
    {#each feed.messages as message}
        <li class="message" transition:fade={{duration: 100}}>
            {@render message.render()}
            <Button 
                outerClassName="message__close" 
                className="message__close__button" 
                aria-label="Delete this notification"
                onclick={() => messfeed_Remove(feed, message.id)}
            >×</Button>
        </li>
    {/each}
</ol>


<style>
    .feed {
        --max-item-width: 450px;
        padding: var(--gap-32) 40px var(--gap-32) var(--gap-32);
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
        gap: var(--gap-16);
        position: fixed;
        inset: 0;
        z-index: var(--z-above-2);
        pointer-events: none;
        background: radial-gradient(
            ellipse 70% 400px at bottom,
            rgb(from black r g b / 0.4),
            rgb(from black r g b / 0) 50%
        );
        transition: opacity 300ms ease-in-out;
        contain: strict;
    }
    .feed:empty {
        opacity: 0;
    }
    .message {
        position: relative;
        max-width: var(--max-item-width);
        pointer-events: all;
    }
    .message__content {
        text-align: justify;
    }
    :global(.message__close) {
        --border-width: 0;
        --color-light: var(--light);
        --color-dark: transparent;
        /* --color-dark: rgb(from var(--dark) r g b / 0.8); */
        position: absolute;
        top: 50%;
        right: 0;
        translate: 100% -50%;
    }
    :global(.message__close__button) {
        font-size: var(--font-size-32);
        font-weight: 300;
        line-height: calc(1.2 * var(--font-size-16));
    }
</style>