<!--
- TODO: Use semantic elements & make accessible in general
- TODO: Standardize styling with the rest
- TODO: Animate whether possible
- TODO: Implement selecting
-->
<script lang="ts">
  import Section from "$lib/components/general/Section.svelte";
  import { crossfade, fade, scale } from "svelte/transition";
  import { pageBgClr } from "../+layout.svelte";
  import { licenses } from "./licenses";

  let inspectLicenseAt: number|null = $state(null);
  let selectLicensesAt: number[] = $state([]);

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
      class="license-explorer"

      onmouseleave={() => inspectLicenseAt = null}
    >
      <ul class="license-list">
        {#each licenses as license, at}
          <li
            class="license"
            class:license--inspect={inspectLicenseAt === at}

            onmouseenter={() => inspectLicenseAt = at}
          >
            <h3 class="license__title">
              <span class="license__price">{license.price}<span class="license__price-postfix">{license.pricePostFix}</span></span><span class="license__name">{license.name}</span>
            </h3>
            <p class="license__summary">{license.summary}</p>
          </li>
        {/each}
      </ul>
      <div class="license-terms">
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
          <span class="license-terms__indeterminate">Hover/click a license for a summary of its terms</span>
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
    flex-basis: 500px;
  }
  .license-terms {
    flex-grow: 0;
    flex-basis: 40ch;
  }

  .license {
    padding-bottom: var(--gap-32);
    transition: opacity 200ms ease-in-out;
  }
  .license-list:has(.license--inspect) {
    & .license {
      opacity: 0.3;
    }

    & .license--inspect {
      opacity: 1;
    }
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
    color: var(--light);
    opacity: 0.7;
  }
</style>
