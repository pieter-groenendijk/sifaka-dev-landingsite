<script lang="ts">
    import TextInput from "$lib/components/general/input/TextInput.svelte";
    import Section from "$lib/components/general/Section.svelte";
    import { judgeEmail, judgePassword } from "$lib/logic/validation/client";
    import { pageBgClr } from "../+layout.svelte";

    pageBgClr.css = "var(--dark-turquose)";

    const isProcessing = $state(false);

    let email = $state("");
    let emailIsGood: boolean|undefined = $state(undefined);
    let emailMessage: string = $state("");
    function _judgeEmail() {
      ({isGood: emailIsGood, message: emailMessage} = judgeEmail(email));
    }

    let password = $state("");
    let passwordIsGood: boolean|undefined = $state(undefined);
    let passwordMessage: string = $state("");
    function _judgePassword() {
      ({isGood: passwordIsGood, message: passwordMessage} = judgePassword(password));
    }
</script>



<main>
    <Section>
        <form>
            <div>
                <label>E-mail</label>
                <TextInput
                    name="email"
                    placeholder="name@domain.extension"
                    isProcessing={isProcessing}
                    bind:value={email}
                    bind:isGood={emailIsGood}
                    bind:message={emailMessage}
                    judge={_judgeEmail}
                />
            </div>
            <div>
                <label>Password</label>
                <TextInput
                    name="password"
                    placeholder=""
                    attr={{
                        type: "password",
                    }}
                    isProcessing={isProcessing}
                    bind:value={password}
                    bind:isGood={passwordIsGood}
                    bind:message={passwordMessage}
                    judge={_judgePassword}
                />
            </div>
        </form>
    </Section>
</main>


<style>

</style>
