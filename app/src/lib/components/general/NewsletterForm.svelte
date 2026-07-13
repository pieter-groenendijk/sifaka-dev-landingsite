<script lang="ts">
    import { getMailURL } from "$lib/logic/host/host";
    import TextInput from "./input/TextInput.svelte";
    import "$lib/styling/interactions.css";
    import { globalMessageFeed, messfeed_Add, renderBad } from "./input/message-feed/MessageFeed.svelte";
    import Button from "./input/Button.svelte";
    import { mailSocialHref } from "$lib/ext-links/ext-links";

    let emailValue: string = $state("");
    let emailIsGood: boolean|undefined = $state(undefined);
    let emailMessage: string = $state("");
    function judgeEmail() {
        if (emailValue.length === 0) {
            emailIsGood = false;
            emailMessage = "Enter an e-mail";
            return;
        }

        // Valid email
        const validEmailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        if (!validEmailRegex.test(emailValue)) {
            emailIsGood = false;
            emailMessage = "Enter an valid email";
            return;
        }

        emailIsGood = true;
    }

    let isProcessing: boolean = $state(false);
    let isGood: boolean | undefined = $state(undefined);
    function onSubmit(event: SubmitEvent) {
        event.preventDefault();

        judgeEmail();
        if (!emailIsGood) {
            return;
        }

        isProcessing = true;
        isGood = undefined;

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

    const submitButtonText = $derived.by(() => {
        if (isGood === undefined) {
            return "➔";
        }


        if (isGood) {
            return ":)";
        } else {
            return ":(";
        }
    });

    let timeoutId: number;
    $effect(function clearJudgementAfterTimeout() {
        if (isGood === undefined) {
            return;
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            isGood = undefined;
        }, 5000);
    });
</script>

{#snippet renderUnexpectedErrorMessage()}
    {#snippet content()}
        Sorry, something went unexpectedly wrong at our end while trying to add you to our newsletter list. Please try again or <a href={mailSocialHref}>contact</a> me.
    {/snippet}

    {@render renderBad(content)}
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

            outerClassName="news-form__input"
            attr={{
                id: "news-email-input",
                autocomplete: "email",
            }}
        />
        <Button
            className="news-form__submit interactable--alt"
            type="submit"
            isProcessing={isProcessing}
            isGood={isGood}
        >{submitButtonText}</Button>
    </div>
</form>


<style>
    .news-form__label {
        display: block;
        margin-bottom: var(--gap-16);
        max-width: 25ch;
        text-align: justify;
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
        display: flex;
        gap: var(--gap-12);
    }
    :global(.news-form__input) {
        flex: 1 1 0;
    }

    :global(.news-form__submit) {
        font-size: var(--gap-32);
        line-height: calc(1.2 * var(--font-size-16));
    }
</style>