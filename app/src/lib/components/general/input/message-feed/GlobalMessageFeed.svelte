<script module>
    import type { Snippet } from 'svelte';

    export interface MessageFeedMessage {
        id: number,
        render: Snippet,
    }

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
    const { data = globalMessageFeed }: { data?: MessageFeed } = $props();
</script>


<ol class="feed">
    {#each data.messages as message}
        <li class="feed__message pressable">{@render message.render()}</li>
    {/each}
</ol>


<style>
    .feed {
        --max-item-width: 450px;
        padding: var(--gap-32);
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
    .feed__message {
        pointer-events: all;
        max-width: var(--max-item-width);
    }
</style>