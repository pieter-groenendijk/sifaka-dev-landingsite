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
-->
<script lang="ts">
  import PickerControl from "$lib/components/general/inputv2/PickerControl.svelte";
  import SwitchControl from "$lib/components/general/inputv2/SwitchControl.svelte";
  import TextControl from "$lib/components/general/inputv2/TextControl.svelte";
  import SupNote from "$lib/components/general/SupNote.svelte";
  import { genId } from "$lib/logic/id/id";
  import { onMount } from "svelte";
  import { pageBgClr } from "../+layout.svelte";
  import { licenses, type License } from "./licenses";

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

  let accUsername: string = $state("");

  const individualBuyer = "individual";
  const organizationBuyer = "organization";
  let buyer: string|undefined = $state(organizationBuyer);

  let orgName: string = $state("");
  let orgVAT: string = $state("");
  let orgCountry: string = $state("");
  let orgState: string = $state("");
  let orgCity: string = $state("");
  let orgStreet: string = $state("");
  let orgPostCode: string = $state("");

  let stepElemList: Element[] = new Array(5);
  let stepElemIdList: string[] = [genId(), genId(), genId(), genId(), genId()];
  let stepElemActiveList: boolean[] = $state(new Array(5).fill(false));

  $effect(() => {
    console.log($state.snapshot(stepElemActiveList));
  })

  onMount(() => {
    // Initialize tracking visiblity (intersection really..)
    const visibilityObserver = new IntersectionObserver((entries) => {
      const len = entries.length;
      for (let at = 0; at < len; ++at) {
        const entry = entries[at];

        const step = stepElemList.indexOf(entry.target);
        if (step === -1) {
          console.warn("oh oh, something went wrong; please check here");
          return;
        }

        stepElemActiveList[step] = entry.isIntersecting;
      }
      // console.log(entries);
    });
    const len = stepElemList.length;
    for (let at = 0; at < len; ++at) {
      visibilityObserver.observe(stepElemList[at]);
    }
  });
</script>



{#snippet progressLink(text: string, at: number)}
  <a
    class="progress__link"
    class:progress__link--active={stepElemActiveList[at]}
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
        {#each stepElemActiveList as isVisible}
          <div
            class="progress__marker"
            class:progress__marker--active={isVisible}
          ></div>
        {/each}
      </div>
      <nav class="progress__nav">
        {@render progressLink("Browser & Select Terms", 0)}
        {@render progressLink("Configure Terms", 1)}
        {@render progressLink("Your info", 2)}
        {@render progressLink("Summary", 3)}
        {@render progressLink("Pay", 4)}
      </nav>
    </aside>

    <form class="form">
      <fieldset
        bind:this={stepElemList[0]}
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
        bind:this={stepElemList[1]}
        id={stepElemIdList[1]}
        class="fieldset fieldset--license-config"
      >
        <legend class="section__title">Configure</legend>

      </fieldset>
      <fieldset
        bind:this={stepElemList[2]}
        id={stepElemIdList[2]}
        class="fieldset fieldset--buyer-info"
        name="buyer-info"
      >
        <PickerControl
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
          className="control"
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
              className="control control--org-name"
              type="text"
              name="org-name"
              placeholder="Company Inc."
              label={{
                label: "Organization name"
              }}
              bind:value={orgName}
              judgement={{
                isProcessing: false,
              }}
              />
            <TextControl
              className="control control--org-vat"
              type="text"
              name="org-vat"
              placeholder="GB999999973"
              label={{
                label: "VAT number"
              }}
              bind:value={orgVAT}
              judgement={{
                isProcessing: false,
              }}
              />
            <!-- Make a traditional select -->
            <div class="address-generic">
              <TextControl
                className="control control--org-country"
                type="text"
                name="org-country"
                placeholder="United Kingdom"
                label={{
                  label: "Country"
                }}
                bind:value={orgCountry}
                judgement={{
                  isProcessing: false,
                }}
                />
              <TextControl
                className="control control--org-state"
                type="text"
                name="org-state"
                placeholder="County of London"
                label={{
                  label: "State/County"
                }}
                bind:value={orgState}
                judgement={{
                  isProcessing: false,
                }}
                />
            </div>
            <div class="address-specific">
              <TextControl
                className="control control--org-city"
                type="text"
                name="org-city"
                placeholder="London"
                label={{
                  label: "City/Town"
                }}
                bind:value={orgCity}
                judgement={{
                  isProcessing: false,
                }}
                />
              <TextControl
                className="control control--org-street"
                type="text"
                name="org-street"
                placeholder="Brownlow Street"
                label={{
                  label: "Street"
                }}
                bind:value={orgStreet}
                judgement={{
                  isProcessing: false,
                }}
                />
              <TextControl
                className="control control--org-postcode"
                type="text"
                name="org-postcode"
                placeholder="CR92AW"
                label={{
                  label: "Postcode"
                }}
                bind:value={orgPostCode}
                judgement={{
                  isProcessing: false,
                }}
                />
            </div>
          </fieldset>
        {:else if buyer !== individualBuyer}
          <SupNote id="fieldset--buyer-placeholder">Please select whether you're buying for yourself or an organization to continue...</SupNote>
        {/if}
      </fieldset>
    </form>

    <section
      bind:this={stepElemList[3]}
      id={stepElemIdList[3]}
      class="section--pay"
    >
      <h2 class="section__title">Summary</h2>
    </section>
    <section
      bind:this={stepElemList[4]}
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
    grid-template-columns: auto 3px fit-content(100%);
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
    background-color: rgb(from var(--light) r g b / 0.6);
  }
  .progress__nav {
    grid-column: -1;
    grid-row: 1 / -1;
    display: grid;
    grid-template-rows: subgrid;
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
    color: rgb(from var(--light) r g b / 0.7);

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
  .progress__link--active {
    color: var(--light);
  }

  .form {
    display: contents;
  }

  .fieldset {
    grid-column: 1;
  }
  .fieldset--license-config {
    box-sizing: border-box;
    margin-inline: auto;
    max-width: 1920px;
    padding-inline: var(--gap-128);
    padding-bottom: var(--gap-128);
  }
  .fieldset--buyer-info {
    box-sizing: border-box;
    margin-inline: auto;
    max-width: 800px;
    padding-inline: var(--gap-128);
    padding-bottom: var(--gap-128);
  }

  .fieldset__legend {
    display: none;
  }

  :global(.control) {
    margin-bottom: var(--gap-16);
  }

  .address-generic {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-12);
  }
  :global(.control--org-country) {
    flex: 1 0 16ch;
  }
  :global(.control--org-state) {
    flex: 1 0 16ch;
  }

  .address-specific {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-12);
  }
  :global(.control--org-city) {
    flex: 2 0 16ch;
  }
  :global(.control--org-street) {
    flex: 2 0 16ch;
  }
  :global(.control--org-postcode) {
    flex: 1 0 8ch;
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
