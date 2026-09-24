<!--
- TODO: Standardize styling with the rest
  - TODO: Extract regular H1
  - TODO: Extract regular H2
  - TODO: Extract regular H3
  - TODO: Extract p1
  - TODO: Extract p2
  - TODO: Extract supplementary link (e.g. "Full terms")
  - TODO: Extract supplementary note (e.g. "Hover a license for a summary of its terms")
  - TODO: Extract strong (e.g. "FREE")
  - TODO: Extract button component
- TODO: Animate whether possible
- TODO: Make responsive
- TODO: Disallow configuring 'seats' and combining with other licenses with free trial
- TODO: Disallow configuring 'seats' with non-commercial
- TODO: Convert to simple check
-->
<script lang="ts">
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
</script>


<main>
  <header class="header">
    <h1 class="title">Licenses & Pricing</h1>
    <p class="introduction">To hopefully best fit your use-case and circumstance, multiple types of licenses are offered. Each license — except for the free trial — gets you the same product, although under different terms.</p>
  </header>
  <form>
    <section class="section--licenses">
      <h2 class="section__title">Terms</h2>
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
            <span class="license-terms__indeterminate">Hover a license for a summary of its terms</span>
          {/if}
        </div>
      </div>
    </section>
    <section class="section--license-config">
      <h2 class="section__title">Configure</h2>
      <label class="toggle__label" for="toggle">Steering</label>
      <select
        aria-label="Buying as an organization or individual"
        id="toggle"
        class="toggle"
        size="2"
      >
        <option class="toggle__option" value="individual">Individual</option>
        <option class="toggle__option" value="organization" selected>Organization</option>
      </select>
    </section>
    <section class="section--buyer-info">
      <h2 class="section__title">Your info</h2>
    </section>
    <section class="section--summary">
      <h2 class="section__title">Summary</h2>
    </section>
    <section class="section--pay">
      <h2 class="section__title">Summary</h2>
    </section>
    <section class="section--thanks">

    </section>
  </form>
</main>



<style>
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

  .section--license-config {
    box-sizing: border-box;
    margin-inline: auto;
    max-width: calc(1920px - var(--gap-128));
    padding-inline: var(--gap-128);
    padding-bottom: var(--gap-128);
  }
  .toggle__label {
    display: block;
    font-size: var(--font-size-16);
    font-weight: 400;
    color: rgb(from var(--light) r g b / 0.8);
    padding-bottom: var(--gap-4);
    padding-left: var(--gap-4);
  }
  .toggle {
    appearance: base-select;
    border-radius: var(--gap-16);
    padding: var(--gap-4);
    width: fit-content;
    height: unset;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap-4);
    isolation: isolate;
    background-color: rgb(from var(--brown) r g b / .3);
    anchor-scope: --toggled-option;

    &::before {
      content: "";
      position-anchor: --toggled-option;
      position: absolute;
      left: anchor(left);
      right: anchor(right);
      top: anchor(top);
      bottom: anchor(bottom);
      border-radius: var(--gap-8);
      background-color: var(--yellow);
      z-index: -1;
    }

    &:focus-within::before {
      transition: inset 150ms ease-in-out;
    }
  }
  .toggle__option {
    display: block;
    min-height: unset;
    border-radius: var(--gap-8);
    padding: var(--gap-8) var(--gap-16);
    box-shadow: 0 0 0px 0px var(--yellow);
    font-family: var(--font-family-fancy);
    font-size: var(--font-size-18);
    font-weight: 600;
    text-transform: capitalize;
    line-height: 100%;
    color: var(--yellow);
    transition:
      box-shadow 100ms ease-in-out,
      border-radius 100ms ease-in-out,
      color 200ms ease-in-out;

    &::checkmark {
      display: none;
    }

    &:checked {
      anchor-name: --toggled-option;
      color: var(--brown);
    }
  }


  .section--licenses {
    box-sizing: border-box;
    margin-inline: auto;
    max-width: calc(1920px - var(--gap-128));
    padding-inline: var(--gap-128);
    padding-bottom: var(--gap-128);
  }
  .section__title {
    display: none;
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
