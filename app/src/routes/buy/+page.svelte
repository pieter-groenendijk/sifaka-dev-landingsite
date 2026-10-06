<!--
- TODO: Standardize styling with the rest
  - TODO: Extract regular H1
  - TODO: Extract regular H2
  - TODO: Extract regular H3
  - TODO: Extract p1
  - TODO: Extract p2
  - TODO: Extract supplementary link (e.g. "Full terms")
  - TODO: Extract strong (e.g. "FREE")
  - TODO: Extract button component
- TODO: Animate whether possible
- TODO: Make responsive
- TODO: Disallow configuring 'seats' and combining with other licenses with free trial
- TODO: Disallow configuring 'seats' with non-commercial
- TODO: Convert to simple check
- TODO: Only select & orient in first step
- TODO: Use radio inputs for selecting licenses
- TODO: Show terms one select as well (for touch)
- TODO: Swap yellow and light colors maybe?
- TODO: Validation
- TODO: Backend integration? Or just paddle stuff
- TODO: Standardize for browsers
- TODO: Select for countries
- TODO: Add required markings
-->
<script lang="ts">
  import PickerControl from "$lib/components/general/inputv2/PickerControl.svelte";
  import SwitchControl from "$lib/components/general/inputv2/SwitchControl.svelte";
  import TextControl from "$lib/components/general/inputv2/TextControl.svelte";
  import SupNote from "$lib/components/general/SupNote.svelte";
  import { genId } from "$lib/logic/id/id";
  import { pageBgClr } from "../+layout.svelte";
  import { licenses, type License } from "./licenses";
  import LinkedControls from "$lib/components/general/inputv2/LinkedControls.svelte";
  import { judge_HandlerCommit, judge_HandlerCreate, judge_HandlerUpdate, judge_JudgementCreate, judge_State, type judge_Handler, type judge_Judgement } from "$lib/logic/validation/validation";

  let inspectLicenseAt: number|null = $state(null);
  let licenseAmounts: number[] = $state(new Array(licenses.length).fill(0));

  pageBgClr.css = "var(--dark-green)";

  function inputId(license: License): string {
    return `license-${license.id}`;
  }

  function onLicenseAmountChange(event: Event) {
    const elem = event.currentTarget as HTMLInputElement;
    if (elem.value === "") {
      elem.value = "0";
    }
  }
  function toggleSelectLicense(at: number, amountInputId: string) {
    if (licenseAmounts[at] !== 0) {
      licenseAmounts[at] = 0;
    } else {
      licenseAmounts[at] = 1;
      document.getElementById(amountInputId)?.focus();
    }
  }

  let stepElemIdList: string[] = [genId(), genId(), genId(), genId(), genId()];

  let accUsername: string = $state("");
  let accUsernameIsGood: boolean|undefined = $state(undefined);
  let accUsernameMessage: string|undefined = $state(undefined);
  function judgeUsername(): void {
    if (accUsername.length === 0) {
      accUsernameIsGood = false;
      accUsernameMessage = "Required";
      return;
    }

    accUsernameIsGood = true;
    accUsernameMessage = undefined;
  }

  const individualBuyer = "individual";
  const organizationBuyer = "organization";
  let buyer: string|undefined = $state(organizationBuyer);

  let period: "fixed"|"auto-renew"|undefined = $state("fixed");
  let periodJudgement: judge_Judgement = $state(judge_JudgementCreate());


  let durationHandler = $state(judge_HandlerCreate<string|null>((judgement, value) => {
    console.log("judge duration");
    judgement.State = judge_State.Undetermined;
    judgement.Message = "";

    if (value === null || value.length === 0) {
      periodJudgement.State = judge_State.Bad;
      periodJudgement.Message = "Required";
      return;
    }

    const valueAsNumber = Number.parseFloat(value);
    if (Number.isNaN(valueAsNumber)) {
      periodJudgement.State = judge_State.Bad;
      periodJudgement.Message = "Duration must be a number";
      return;
    }

    if (valueAsNumber <= 0) {
      periodJudgement.State = judge_State.Bad;
      periodJudgement.Message = "Duration must be a positive number";
      return;
    }

    if (Math.floor(valueAsNumber) !== valueAsNumber) {
      periodJudgement.State = judge_State.Bad;
      periodJudgement.Message = "Duration must be a whole number";
      return;
    }

    if (valueAsNumber > 12) {
      periodJudgement.State = judge_State.Bad;
      periodJudgement.Message = "Fixed periods of more than a year aren't offered. Consider an automatically renewed period instead!";
      return;
    }

    periodJudgement.State = judge_State.Good;
    periodJudgement.Message = "";
  }, "1"));

  function judgeEndDate(judgement: judge_Judgement, value: string) {
    judgement.State = judge_State.Undetermined;
    judgement.Message = "";
  }
  let endDateHandler = $derived.by(() => {
    const duration = durationHandler.Value;
    console.log("update end date");

    if (duration === null || duration.length === 0) {
      return judge_HandlerCreate<string>(judgeEndDate, "");
    }
    const _duration = Number.parseFloat(duration);
    if (_duration < 0) {
      return judge_HandlerCreate<string>(judgeEndDate, "");
    }

    const now = new Date();

    const year = now.getFullYear() + Math.floor((now.getMonth() + _duration) / 12);
    const month = (now.getMonth() + _duration) % 12 + 1;
    const day = now.getDate();

    return judge_HandlerCreate<string>(
      judgeEndDate,
      `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
    );
  });
  function setEndDate(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    if (newValue === undefined || newValue === null) {
      durationHandler.Value = "";
      judge_HandlerCommit(durationHandler);
      return;
    }

    const now = new Date();
    const date = new Date(newValue);
    if (date.toString() == "Invalid Date") {
      durationHandler.Value = "";
      judge_HandlerCommit(durationHandler);
      return;
    }
    date.setDate(now.getDate());

    let months = (date.getFullYear() - now.getFullYear()) * 12;
    months += date.getMonth() - now.getMonth();

    durationHandler.Value = months.toString();
    judge_HandlerCommit(durationHandler);
    console.log(durationHandler.Value);
  }

  let orgNameHandler = $state(judge_HandlerCreate<string>((judgement, value) => {
    if (value.length === 0) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Required";
      return;
    }

    if (value.length > 200) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Maximum of 200 characters";
      return;
    }

    judgement.State = judge_State.Good;
    judgement.Message = "";
  }, ""));

  let orgVATHandler = $state(judge_HandlerCreate<string>((judgement, value) => {
    if (value.length === 0) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Required";
      return;
    }

    // Very permissive check, normally 15 + 2 characters at the most according to Wikipedia, checked by 3rd party later anyways.
    if (value.length >= 30) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Enter a valid VAT number";
      return;
    }

    judgement.State = judge_State.Good;
    judgement.Message = "";
  }, ""));

  let orgCountryHandler = $state(judge_HandlerCreate<string>((judgement, value) => {
    if (value.length === 0) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Required";
      return;
    }

    judgement.State = judge_State.Good;
    judgement.Message = "";
  }, ""));

  let orgStateHandler = $state(judge_HandlerCreate<string>((judgement, value) => {
    if (value.length === 0) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Required";
      return;
    }

    judgement.State = judge_State.Good;
    judgement.Message = "";
  }, ""));

  let orgCityHandler = $state(judge_HandlerCreate<string>((judgement, value) => {
    if (value.length === 0) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Required";
      return;
    }

    judgement.State = judge_State.Good;
    judgement.Message = "";
  }, ""));

  let orgStreetHandler = $state(judge_HandlerCreate<string>((judgement, value) => {
    if (value.length === 0) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Required";
      return;
    }

    judgement.State = judge_State.Good;
    judgement.Message = "";
  }, ""));

  let orgPostcodeHandler = $state(judge_HandlerCreate<string>((judgement, value) => {
    if (value.length === 0) {
      judgement.State = judge_State.Bad;
      judgement.Message = "Required";
      return;
    }

    judgement.State = judge_State.Good;
    judgement.Message = "";
  }, ""));

</script>



{#snippet progressLink(text: string, at: number)}
  <a
    class="progress__link"
    href={`#${stepElemIdList[at]}`}
  >{text}</a>
{/snippet}



<main>
  <header class="header">
    <h1 class="title">Licenses & Pricing</h1>
    <p class="introduction">To hopefully best fit your use-case and circumstance, multiple types of licenses are offered. Each license — except for the free trial — gets you the same product, although under different terms.</p>
  </header>
  <section class="section--process">
    <aside class="progress">
      <div aria-hidden="true" class="progress__marker-list">
        {#each stepElemIdList}
          <div
            class="progress__marker"
          ></div>
        {/each}
      </div>
      <nav class="progress__nav">
        {@render progressLink("Browse & Select Terms", 0)}
        {@render progressLink("Configure Terms", 1)}
        {@render progressLink("Your info", 2)}
        {@render progressLink("Summary", 3)}
        {@render progressLink("Pay", 4)}
      </nav>
    </aside>

    <form class="form">
      <fieldset
        id={stepElemIdList[0]}
        class="fieldset section--licenses"
      >
        <legend class="fieldset__legend">Browse & Select Terms</legend>
        <div
          role="menu"
          tabindex="0"
          class="license-explorer"

          onmouseleave={() => inspectLicenseAt = null}
        >
          <ul class="license-list">
            {#each licenses as license, at}
              {@const amountInputId = `license-${license.id}`}
              <li
                class="license"
                class:license--inspected={inspectLicenseAt === at}
                class:license--selected={licenseAmounts[at] !== 0}

                onmouseenter={() => inspectLicenseAt = at}
              >
                <div
                  class="license__amount"
                >
                  <label for={amountInputId} class="license__amount__label">seats</label>
                  <input
                    id={amountInputId}
                    class="license__amount__input"
                    name={`${license.id}-license-amount`}
                    type="number"
                    min="0"
                    max="999"
                    bind:value={licenseAmounts[at]}
                    onchange={onLicenseAmountChange}
                  />
                </div>
                <button
                  aria-label="Press once to set the amount of seats to get of this license to one. Press again to set it back to zero."
                  aria-controls={amountInputId}
                  onclick={() => toggleSelectLicense(at, amountInputId)}
                >
                  <h3 class="license__title">
                    <span class="license__price">{license.price}<span class="license__price-postfix">{license.pricePostFix}</span></span><span class="license__name">{license.name}</span>
                  </h3>
                  <p class="license__summary">{license.summary}</p>
                  <div class="license__aria-terms">
                    <a href={license.longTermsURL}>Full terms</a>
                    <ul>
                      {#each license.shortTerms as shortTerm}
                        <li>{shortTerm}</li>
                      {/each}
                    </ul>
                  </div>
                </button>
              </li>
            {/each}
          </ul>
          <div class="license-terms" aria-hidden="true">
            {#if inspectLicenseAt !== null}
              {@const at = inspectLicenseAt}
              {@const license = licenses[at]}
              {@const inputAmountId = inputId(license)}
              <a href={license.longTermsURL} class="license-terms__long-terms">Full terms</a>
              <h4 class="license-terms__title">TL;DR of Terms</h4>
              <ul class="license-terms__list">
                {#each license.shortTerms as shortTerm}
                  <li class="license-terms__term">{shortTerm}</li>
                {/each}
              </ul>
              <button
                class="license-terms__getter"
                onclick={() => toggleSelectLicense(at, inputAmountId)}
              >
                {#if licenseAmounts[at] === 0}
                  configure & buy
                {:else}
                  unselect
                {/if}
              </button>
            {:else}
              <SupNote>Hover a license for a summary of its terms</SupNote>
            {/if}
          </div>
        </div>
      </fieldset>
      <fieldset
        id={stepElemIdList[1]}
        class="fieldset fieldset--license-config"
      >
        <legend class="fieldset__legend">Configure</legend>
        <SwitchControl
          className="field"
          name="period-type"
          options={{
            list: [
              {key: "Fixed", value: "fixed"},
              {key: "Auto-renewed", value: "auto-renew"},
            ],
          }}
          bind:value={period}
          label={{
            label: "Period",
            supplement: "A fixed period specifies the number of active months. An auto-renewed period remains active until cancelled."
          }}
          judgement={{
            isProcessing: false,
          }}
        />

        {#if period === "fixed"}
          <LinkedControls
            className="field"
            label={{
              label: "Duration / End Date",
            }}
            judgement={periodJudgement}
          >
            {#snippet leftControl()}
              <TextControl
                className="field--duration"
                name="duration"
                type="number"
                placeholder=""
                label={{
                  label: "Fixed period given as end date.",
                  hidden: true,
                }}
                bind:value={durationHandler.Value}
                judgement={durationHandler.Judgement}
                oninput={() => judge_HandlerUpdate(durationHandler)}
                onchange={() => judge_HandlerCommit(durationHandler)}
              />
            {/snippet}
            {#snippet rightControl()}
              <TextControl
                className="field--end-date"
                name="end-date"
                type="date"
                placeholder=""
                label={{
                  label: "Fixed period given as duration",
                  hidden: true,
                }}
                value={endDateHandler.Value}
                judgement={endDateHandler.Judgement}
                onchange={setEndDate}
              />
            {/snippet}
          </LinkedControls>
        {/if}
      </fieldset>
      <fieldset
        id={stepElemIdList[2]}
        class="fieldset fieldset--buyer-info"
        name="buyer-info"
      >
        <PickerControl
          className="field"
          name="acc-username"
          label={{
            label: "Account",
            supplement: "Licenses being purchased will be coupled to the currently logged in account. ",
            picker: accUsername === "" ? "Log in / Sign up" : "Change Account",
          }}
          bind:value={accUsername}
          placeholder="No account chosen"
          judgement={{
            isProcessing: false,
          }}
        />
        <SwitchControl
          className="field"
          bind:value={buyer}
          name="buyer-type"
          label={{
            label: "Owner",
            supplement: "Purchasing for yourself or on the behalf of an organization."
          }}
          options={{
            list: [
              {
                key: "Individual",
                value: individualBuyer,
              },
              {
                key: "Organization",
                value: organizationBuyer,
              }
            ],
          }}
          judgement={{
            isProcessing: false,
          }}
          selectAttr={{
            "aria-owns": "fieldset--organization-buyer fieldset--buyer-placeholder"
          }}
        />
        {#if buyer === organizationBuyer}
          <fieldset id="fieldset--organization-buyer" name="organization">
            <TextControl
              className="field field--org-name"
              type="text"
              name="org-name"
              placeholder="Company Inc."
              label={{
                label: "Organization name"
              }}
              bind:value={orgNameHandler.Value}
              judgement={orgNameHandler.Judgement}
              oninput={() => judge_HandlerUpdate(orgNameHandler)}
              onchange={() => judge_HandlerCommit(orgNameHandler)}
            />
            <TextControl
              className="field field--org-vat"
              type="text"
              name="org-vat"
              placeholder="GB999999973"
              label={{
                label: "VAT number"
              }}
              bind:value={orgVATHandler.Value}
              judgement={orgVATHandler.Judgement}
              oninput={() => judge_HandlerUpdate(orgVATHandler)}
              onchange={() => judge_HandlerCommit(orgVATHandler)}
            />
            <!-- Make a traditional select -->
            <div class="address-generic">
              <TextControl
                className="field field--org-country"
                type="text"
                name="org-country"
                placeholder="United Kingdom"
                label={{
                  label: "Country"
                }}
                bind:value={orgCountryHandler.Value}
                judgement={orgCountryHandler.Judgement}
                oninput={() => judge_HandlerUpdate(orgCountryHandler)}
                onchange={() => judge_HandlerCommit(orgCountryHandler)}
              />
              <TextControl
                className="field field--org-state"
                type="text"
                name="org-state"
                placeholder="County of London"
                label={{
                  label: "State/County"
                }}
                bind:value={orgStateHandler.Value}
                judgement={orgStateHandler.Judgement}
                oninput={() => judge_HandlerUpdate(orgStateHandler)}
                onchange={() => judge_HandlerCommit(orgStateHandler)}
              />
            </div>
            <div class="address-specific">
              <TextControl
                className="field field--org-city"
                type="text"
                name="org-city"
                placeholder="London"
                label={{
                  label: "City/Town"
                }}
                bind:value={orgCityHandler.Value}
                judgement={orgCityHandler.Judgement}
                oninput={() => judge_HandlerUpdate(orgCityHandler)}
                onchange={() => judge_HandlerCommit(orgCityHandler)}
              />
              <TextControl
                className="field field--org-street"
                type="text"
                name="org-street"
                placeholder="Brownlow Street"
                label={{
                  label: "Street"
                }}
                bind:value={orgStreetHandler.Value}
                judgement={orgStreetHandler.Judgement}
                oninput={() => judge_HandlerUpdate(orgStreetHandler)}
                onchange={() => judge_HandlerCommit(orgStreetHandler)}
              />
              <TextControl
                className="field field--org-postcode"
                type="text"
                name="org-postcode"
                placeholder="CR92AW"
                label={{
                  label: "Postcode"
                }}
                bind:value={orgPostcodeHandler.Value}
                judgement={orgPostcodeHandler.Judgement}
                oninput={() => judge_HandlerUpdate(orgPostcodeHandler)}
                onchange={() => judge_HandlerCommit(orgPostcodeHandler)}
              />
            </div>
          </fieldset>
        {:else if buyer !== individualBuyer}
          <SupNote id="fieldset--buyer-placeholder">Please select whether you're buying for yourself or an organization to continue...</SupNote>
        {/if}
      </fieldset>
    </form>

    <section
      id={stepElemIdList[3]}
      class="section--pay"
    >
      <h2 class="section__title">Summary</h2>
    </section>
    <section
      id={stepElemIdList[4]}
      class="section--thanks"
    >
    </section>

  </section>
</main>



<style>
  .section--process {
    box-sizing: border-box;
    margin-inline: auto;
    max-width: 1920px;
    padding-inline: var(--gap-128);
    padding-bottom: var(--gap-128);

    display: grid;
    grid-template-columns: fit-content(100%) minmax(var(--gap-64), 1fr) fit-content(100%);
    grid-template-rows: repeat(5, auto);
  }

  .progress {
    grid-column: 2 / -1;
    grid-row: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
  }
  .progress__marker-list {
    grid-column: 1;
    grid-row: 1 / -1;
    display: grid;
    grid-template-rows: subgrid;
  }
  .progress__marker {
    justify-self: end;
    width: 3px;
    background-color: rgb(from var(--light) r g b / 0.6);
  }
  .progress__nav {
    grid-column: -1;
    grid-row: 1 / -1;
    display: grid;
    grid-template-rows: subgrid;
    counter-reset: progress;
  }
  .progress__link {
    --min-top: 10vh;
    --max-bottom: 10vh;
    --n-children: 4;

    --margin-left: var(--gap-8);
    --padding-block: var(--gap-8);
    --height: 1lh;

    border-radius: var(--gap-4);
    width: fit-content;
    margin-left: var(--margin-left);
    padding-inline: var(--gap-4);

    align-self: center;
    position: sticky;
    top: calc(var(--min-top) + var(--nth-child) * var(--height));
    bottom: calc(var(--max-bottom) + (var(--n-children) - var(--nth-child)) * var(--height));

    line-height: calc(100% + 2 * var(--padding-block));
    font-size: var(--font-size-14);
    font-weight: 500;
    text-decoration: none;
    color: rgb(from var(--light) r g b / 1);

    transition: 150ms border-radius ease-in-out, 150ms background-color ease-in-out, 150ms color ease-in-out;

    &:nth-child(1) { --nth-child: 0; }
    &:nth-child(2) { --nth-child: 1; }
    &:nth-child(3) { --nth-child: 2; }
    &:nth-child(4) { --nth-child: 3; }
    &:nth-child(5) { --nth-child: 4; }

    &:hover {
      border-radius: var(--gap-8);
      background-color: rgb(from var(--light) r g b / 0.1);
    }

    &::before {
      counter-increment: progress;
      content: counter(progress) ". ";
    }

    &::after {
      --size: var(--gap-8);
      display: block;
      border: var(--gap-4) solid var(--dark-green);
      width: var(--size);
      height: var(--size);

      position: absolute;
      right: calc(100% + var(--margin-left) + 1.5px);
      top: 50%;

      content: "";

      background-color: var(--light);

      transform: translate(50%, -50%);
    }
  }

  .form {
    display: contents;
  }

  .fieldset {
    grid-column: 1;
    margin-bottom: var(--gap-64);
  }
  .fieldset--license-config,
  .fieldset--buyer-info {
    max-width: 600px;
  }

  .fieldset__legend {
    display: none;
  }

  :global(.field) {
    margin-bottom: var(--gap-16);
  }
  :global(.field--duration) {
    flex: 1 0 16ch;
  }
  :global(.field--end-date) {
    flex: 1 0 16ch;
  }
  :global(.field--org-country) {
    flex: 1 0 16ch;
  }
  :global(.field--org-state) {
    flex: 1 0 16ch;
  }
  :global(.field--org-city) {
    flex: 2 0 16ch;
  }
  :global(.field--org-street) {
    flex: 2 0 16ch;
  }
  :global(.field--org-postcode) {
    flex: 1 0 8ch;
  }

  .address-generic {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-12);
  }

  .address-specific {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-12);
  }

  .header {
    box-sizing: border-box;
    margin-inline: auto;
    max-width: 1920px;
    padding-inline: var(--gap-128);
    padding-block: var(--gap-96);
    background-color: var(--dark-green);
  }
  .title {
    margin-bottom: var(--gap-32);
    font-family: var(--font-family-fancy);
    font-size: var(--font-size-64);
    font-weight: 800;
    letter-spacing: 5%;
    color: var(--yellow);
  }
  .introduction {
    max-width: 50ch;
    color: var(--light);
    font-size: var(--font-size-18);
    font-weight: 500;
  }

  .license-explorer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--gap-128);
  }
  .license-list {
    flex-grow: 0;
    flex-shrink: 1;
  }
  .license-terms {
    flex-grow: 0;
    flex-basis: 40ch;
  }

  .license {
    padding-bottom: var(--gap-32);
    display: flex;
    gap: 0;
    align-items: center;
    transition: opacity 200ms ease-in-out, gap 150ms 300ms cubic-bezier(0.75, 0, 0.20, 1);
  }
  .license-list:has(:where(.license--inspected, .license--selected)) {
    & .license {
      opacity: 0.3;
    }

    & .license--inspected,
    & .license--selected {
      opacity: 1;
    }
  }
  .license--selected {
    gap: var(--gap-16);
    transition: opacity 200ms ease-in-out, gap 300ms cubic-bezier(0.75, 0, 0.20, 1);
  }
  .license__title {
    margin-bottom: var(--gap-16);
    font-size: var(--font-size-22);
    font-weight: 500;
    text-transform: uppercase;
  }
  .license__price {
    margin-right: var(--gap-8);
    display: inline-block;
    padding: var(--gap-4) var(--gap-8);
    background-color: var(--yellow);
    color: var(--brown);
  }
  .license__price-postfix {
    font-size: var(--font-size-14);
  }
  .license__name {
    color: var(--yellow);
  }
  .license__summary {
    padding-left: var(--gap-8);
    max-width: 50ch;
    font-size: var(--font-size-18);
    font-weight: 350;
    line-height: 120%;
    color: var(--light);
  }
  .license__aria-terms {
    display: none;
  }

  .license-terms {
    font-size: var(--font-size-18);
    font-weight: 350;
    color: var(--light);
  }
  .license-terms__long-terms {
    display: inline-block;
    margin-bottom: var(--gap-4);
    font-size: var(--font-size-14);
    color: var(--light);
  }
  .license-terms__title {
    margin-bottom: var(--gap-12);
    font-size: var(--font-size-20);
    font-weight: 500;
    color: var(--yellow);
  }
  .license-terms__term {
    margin-bottom: var(--gap-4);
    list-style: inside "> ";
  }
  .license-terms__indeterminate {
    font-size: var(--font-size-14);
    font-weight: 300;
    color: var(--light);
    opacity: 0.7;
  }
  .license-terms__getter {
    border-radius: var(--gap-8);
    margin-top: var(--gap-16);
    padding: var(--gap-8) var(--gap-16);
    box-shadow: 0 0 0px 0px var(--yellow);
    background-color: var(--yellow);
    font-family: var(--font-family-fancy);
    font-size: var(--font-size-18);
    font-weight: 600;
    text-transform: capitalize;
    color: var(--dark-green);
    text-shadow: 0px 0px 0px rgb(from var(--brown) r g b / 0);
    transition:
      box-shadow 100ms ease-in-out,
      border-radius 100ms ease-in-out,
      color 200ms ease-in-out;
  }
  .license-terms__getter:hover {
    box-shadow: 0 0 4px 3px var(--yellow);
    text-shadow: 0px 0px 0px rgb(from var(--brown) r g b / 0.3);
    border-radius: var(--gap-12);
    color: var(--brown);
  }

  .license__amount {
    max-width: 0;
    text-align: center;
    opacity: 0;
    transition: opacity 300ms ease-in-out, max-width 150ms 300ms cubic-bezier(0.75, 0, 0.20, 1);
  }
  .license--selected .license__amount {
    max-width: 50px;
    opacity: 1;
    transition: opacity 150ms 300ms ease-in-out, max-width 300ms cubic-bezier(0.75, 0, 0.20, 1);
  }
  .license__amount__label {
    display: block;
    font-size: var(--font-size-14);
    font-weight: 300;
    color: rgb(from var(--light) r g b / 0.7);
  }
  .license__amount__input {
    margin-inline: calc(-1 * var(--gap-12));
    padding: var(--gap-4) var(--gap-12);
    font-size: var(--font-size-20);
    font-weight: 600;
    color: var(--light);
    field-sizing: content;
    appearance: none;
  }
  .license__amount__input::-webkit-inner-spin-button,
  .license__amount__input::-webkit-outer-spin-button {
    appearance: none;
  }
</style>
