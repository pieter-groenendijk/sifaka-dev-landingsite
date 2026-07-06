<script lang="ts">
    import { getMailURL } from "$lib/logic/host/host";

    function onSubmit(elem: HTMLFormElement) {
        elem.addEventListener("submit", (event: SubmitEvent) => {
            event.preventDefault();

            const url = getMailURL();
            url.pathname = "/api/public/subscription";

            const data = Object.fromEntries(new FormData(elem));
            
            fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data["email"],
                    list_uuids: ["599fc681-22f2-458e-96e4-1fb405169497"],
                }),
            })
            .then(async (resp) => {
                if (!resp.ok) {
                    console.error(resp);
                }

                console.log(await resp.json())
            });
        });
    }
</script>


<form {@attach onSubmit} class="news-form">
    <label 
    class="news-form__label"
    for="news-email-input"
    ><strong>Want to get updates, and/or give feedback?</strong> <a href="/privacy-policy">(No funny business!)</a></label>
    <div class="news-form__control">
        <input 
            id="news-email-input"
            class="news-form__input input"
            name="email"

            type="email" 
            autocomplete="email" 
            placeholder="pleasesayyes@mail.com"
            required
        />
        <button class="news-form__submit" type="submit">➔</button>
    </div>
</form>


<style>
    .news-form__label {
        display: block;
        margin-bottom: var(--gap-16);
        max-width: 30ch;
    }
    .news-form__label > strong {
        font-weight: 500;
        color: var(--light);
    }
    .news-form__label > a {
        margin-left: var(--gap-8);
        font-size: var(--font-size-14);
        color: var(--light);
        opacity: 0.8;
    }
    .news-form__control {
        --control-height: clamp(2rem, 1.652rem + 1.739vw, 3rem); /* 32 - 48 */
        --control-border-radius: var(--gap-8);
        display: flex;
        justify-content: stretch;
        align-items: stretch;
        gap: var(--gap-8);
    }
    .news-form__input {
        flex: 1 1 0;
    }
    @property --background-color {
        syntax: '<color>';
        inherits: true;
    }
    .input {
        --_border-width: var(--border-width, 2px);
        --_border-radius: var(--border-radius, var(--gap-8));
        --_highlight-color: var(--highlight-color, var(--yellow));
        --_background-color: var(--background-color, var(--brown));
        box-sizing: border-box;
        outline: var(--_border-width) solid var(--_highlight-color);
        border-radius: var(--_border-radius);
        height: var(--control-height);
        padding-inline: var(--gap-16);
        font-size: var(--font-size-16);
        font-weight: 500;
        color: var(--_highlight-color);
        background-color: var(--_background-color);
        transition: 
            outline 100ms ease-in-out,
            border-radius 100ms ease-in-out,
            background-color 100ms ease-in-out,
            color 100ms ease-in-out;
    }
    .input::placeholder {
        font-weight: 450;
        color: rgb(from var(--highlight-color) r g b / 0.7);
    }
    /* active */
    .input:hover, .input:focus-within {
        --border-width: 3px;
        --border-radius: calc(var(--gap-8) * 1.4);
        --highlight-color: var(--yellow);
        --background-color: var(--brown);
    }
    .input--processing {
        --border-width: 1px;
        --border-radius: calc(var(--gap-8) * 0.8);
        --highlight-color: var(--yellow);
        --background-color: rgb(from var(--yellow) r g b / 0.3);
    }
    .input--good {
        --border-width: 1px;
        --border-radius: calc(var(--gap-8) * 0.8);
        --highlight-color: var(--green);
        --background-color: rgb(38, 64, 57);
    }
    .input--bad {
        --border-width: 1px;
        --border-radius: calc(var(--gap-8) * 0.8);
        --highlight-color: #CD726A; 
        --background-color: #402626; 
    }
    .news-form__submit {
        flex: 0 0 0;
        aspect-ratio: 1 / 1;
        width: var(--control-height);
        height: var(--control-height);
        border-radius: var(--control-border-radius);
        /* font-size: var(--gap-32); */
        color: var(--dark);
        background-color: var(--yellow);
    }
</style>