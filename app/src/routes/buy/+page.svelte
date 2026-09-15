<!--
- TODO: Standardize styling with the rest
- TODO: Animate whether possible
- TODO: Make responsive
-->
<script lang="ts">
  import { pageBgClr } from "../+layout.svelte";
  import { licenses } from "./licenses";

  let inspectLicenseAt: number|null = $state(null);
  let licenseAmounts: number[] = $state(new Array(licenses.length).fill(0));

  pageBgClr.css = "var(--dark-turquose)";
</script>


<main>
  <header class="header">
    <h1 class="title">Licenses & Pricing</h1>
    <p class="introduction">To hopefully best fit your use-case and circumstance, multiple types of licenses are offered. Each license — except for the free trial — gets you the same product, although under different terms.</p>
  </header>
  <section class="section--licenses">
    <h2 class="section__title">Licenses</h2>
    <div
      role="menu"
      tabindex="0"
      class="license-explorer"

      onmouseleave={() => inspectLicenseAt = null}
    >
      <ul class="license-list">
        {#each licenses as license, at}
          {@const htmlId = `license-${license.id}`}
          <li
            class="license"
            class:license--inspected={inspectLicenseAt === at}
            class:license--selected={licenseAmounts[at] !== 0}

            onmouseenter={() => inspectLicenseAt = at}
          >
            <div
              class="license__amount"
            >
              <label for={htmlId} class="license__amount__label">amount</label>
              <input id={htmlId} class="license__amount__input" name={`${license.id}-license-amount`} type="number" min="0" max="999" bind:value={licenseAmounts[at]}/>
            </div>
            <button
              aria-label="Select license to get by setting the amount of this license type to 1 if not already non-zero."
              onclick={() => {
                if (licenseAmounts[at] !== 0) {
                  return;
                }

                licenseAmounts[at] = 1;
              }}
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
          {@const license = licenses[inspectLicenseAt]}
          <a href={license.longTermsURL} class="license-terms__long-terms">Full terms</a>
          <h4 class="license-terms__title">TL;DR of Terms</h4>
          <ul class="license-terms__list">
            {#each license.shortTerms as shortTerm}
              <li class="license-terms__term">{shortTerm}</li>
            {/each}
          </ul>
        {:else}
          <span class="license-terms__indeterminate">Hover a license for a summary of its terms</span>
        {/if}
      </div>
    </div>
  </section>
</main>



<style>
  .header {
    box-sizing: border-box;
    margin-inline: auto;
    max-width: 1920px;
    padding-inline: var(--gap-128);
    padding-block: var(--gap-96);
    background-color: var(--dark-turquose);
  }
  .title {
    margin-bottom: var(--gap-32);
    font-size: var(--font-size-64);
    font-weight: 800;
    color: var(--yellow);
  }
  .introduction {
    max-width: 60ch;
    color: var(--light);
    font-size: var(--font-size-18);
    font-weight: 500;
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
