<script lang="ts">
    import { getMailURL } from "$lib/logic/host/host";
    import TextInput from "./input/TextInput.svelte";
    import "$lib/styling/interactions.css";

    let isProcessing: boolean = $state(false);

    function onSubmit(elem: HTMLFormElement) {

        elem.addEventListener("submit", async (event: SubmitEvent) => {
            event.preventDefault();

            const url = getMailURL();
            url.pathname = "/api/public/lists";

            const newsletterListUUID = await 
                fetch(url.toString(), {method: "GET"})
                .then(async (resp) => {
                    if (!resp.ok) {
                        // show error
                    }

                    const data: {
                        uuid: string,
                        name: string,
                    }[] = await resp.json();
                    
                    const newsletterList = data.find((value) => value.name === "Newsletter")
                    if (newsletterList === undefined) {
                        // error
                        return;
                    }

                    return newsletterList.uuid;
                })
                .catch((reason) => {

                });

            if (typeof newsletterListUUID !== "string") {
                // error
            }


            url.pathname = "/api/public/subscription";
            const data = Object.fromEntries(new FormData(elem));
            
            fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data["email"],
                    list_uuids: [newsletterListUUID],
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

    let emailIsGood: boolean|undefined = $state(undefined);
    let emailMessage: string = $state("");
    function judgeEmail(emailValue: string) {
        if (emailValue.length === 0) {
            emailIsGood = false;
            emailMessage = "Enter an e-mail"
            return;
        }

        // Valid email
        const validEmailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        if (!validEmailRegex.test(emailValue)) {
            emailIsGood = false;
            emailMessage = "Enter an valid email"
            return;
        }

        emailIsGood = true;
    }
</script>


<form {@attach onSubmit} class="news-form">
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

            judge={judgeEmail}

            className="news-form__input"
            attr={{
                id: "news-email-input",
                autocomplete: "email",
            }}
        />
        <button class="news-form__submit pressable" type="submit">➔</button>
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
    .news-form__submit {
        flex: 0 0 0;
        aspect-ratio: 1 / 1;
        width: var(--control-height);
        height: var(--control-height);
        border-radius: var(--control-border-radius);
        font-size: var(--gap-32);
        font-weight: 400;
        color: var(--dark);
        background-color: var(--yellow);
    }
</style>