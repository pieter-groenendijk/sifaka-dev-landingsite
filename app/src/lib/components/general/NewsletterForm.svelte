<script lang="ts">
    import { getMailURL } from "$lib/logic/host/host";
    import TextInput from "./input/TextInput.svelte";
    import "$lib/styling/interactions.css";
    import { globalMessageFeed, messfeed_Add } from "./input/message-feed/MessageFeed.svelte";
    import SubmitButton from "./input/SubmitButton.svelte";

    let emailValue: string = $state("");
    let emailIsGood: boolean|undefined = $state(undefined);
    let emailMessage: string = $state("");
    function judgeEmail() {
        if (emailValue.length === 0) {
            emailIsGood = false;
            emailMessage = "Enter an e-mail"
            messfeed_Add(globalMessageFeed, renderUnexpectedErrorMessage);
            return;
        }

        // Valid email
        const validEmailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        if (!validEmailRegex.test(emailValue)) {
            emailIsGood = false;
            emailMessage = "Enter an valid email"
            messfeed_Add(globalMessageFeed, renderUnexpectedErrorMessage);
            return;
        }

        emailIsGood = true;
    }

    let isProcessing: boolean = $state(false);
    let isGood: boolean | undefined = $state(undefined);
    function onSubmit(event: SubmitEvent) {
        event.preventDefault();

        isProcessing = false;

        const url = getMailURL();
        url.pathname = "/api/public/lists";

        // Retrieve the UUID of the newsletter to add to
        fetch(url.toString(), {method: "GET"})
            // Preprocess response
            .then((resp) => {
                if (!resp.ok) {
                    throw "Failed to fetch newsletter list UUID: 400/500 error";
                } 

                return resp.json();
            })
            // Filter and find the Newsletter UUID
            .then((lists: {uuid: string, name: string}[]) => {
                const newsletterList = lists.find((value) => value.name === "Newsletter")
                if (newsletterList === undefined) {
                    throw "Newsletter list is not defined";
                }

                return newsletterList.uuid;
            })
            // Add the email as a subscriber to the found newsletter UUID
            .then((newsletterListUUID) => {
                url.pathname = "/api/public/subscription";
                
                return fetch(url.toString(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: emailValue,
                        list_uuids: [newsletterListUUID],
                    }),
                })
            })
            // Happy days if success
            .then((resp) => {
                if (!resp.ok) {
                    throw "400/500 error while subscribing to newsletter";
                }

                isGood = true;
                isProcessing = false;
            })
            .catch((reason) => {
                isGood = false;
                isProcessing = false;
                messfeed_Add(globalMessageFeed, renderUnexpectedErrorMessage);
                console.warn(reason);
            });
    }
</script>


{#snippet renderUnexpectedErrorMessage()}
    <div class="news-form__unexpected-error pressable">Sorry, something went unexpectedly wrong at our end while trying to add you to our newsletter list. Please try again or contact me.</div>
{/snippet}

<form 
    class="news-form"
    onsubmit={onSubmit}
>
    <label 
        class="news-form__label"
        for="news-email-input"
    ><strong>Want to get updates, and/or give feedback?</strong> <a href="/privacy-policy">(No funny business!)</a></label>
    <div class="news-form__control">
        <TextInput
            name="email"
            placeholder="pleasesayyes@mail.com"

            isProcessing={isProcessing}
            bind:isGood={emailIsGood}
            bind:message={emailMessage}
            bind:value={emailValue}

            judge={judgeEmail}

            className="news-form__input"
            attr={{
                id: "news-email-input",
                autocomplete: "email",
            }}
        />
        <SubmitButton 
            className="news-form__submit"
            isProcessing={isProcessing}
            isGood={isGood}
        />
    </div>
</form>


<style>
    .news-form__unexpected-error {
        border-radius: var(--interactive-border-radius);
        border: var(--interactive-border-width) solid var(--bad-color-light);
        border-bottom-width: calc(var(--interactive-border-width) * 2);
        padding: var(--gap-8);
        background-color: var(--bad-color-dark);
        font-weight: 450;
        color: var(--bad-color-light);
        text-wrap: pretty;
    }
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
    :global(.news-form__submit) {
        flex: 0 0 0;
        aspect-ratio: 1 / 1;
        width: var(--control-height);
        height: var(--control-height);
        font-size: var(--gap-32);
    }
</style>