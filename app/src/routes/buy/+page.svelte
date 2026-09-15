<script lang="ts">
  import Section from "$lib/components/general/Section.svelte";
  import { licenses } from "./licenses";

  let selectedLicenseAt: number|null = $state(null);
  function selectLicense(at: number|null) {
    selectedLicenseAt = at;
  }
</script>


<main>
  <h1>Licenses & Pricing</h1>
  <p>To hopefully best fit your use-case and circumstance, multiple types of licenses are offered. Each license — except for the free trial — gets you the same product, although under different terms.</p>
  <Section id="section--license">
    <h2>Licenses</h2>
    <div>
      <ul>
        {#each licenses as license, at}
          <li
            onmouseenter={() => selectedLicenseAt = at}
          >
            <h3>
              <span class="license__price"><strong>{license.price}</strong><span>{license.pricePostFix}</span></span><span>{license.name}</span>
            </h3>
            <p>{license.summary}</p>
          </li>
        {/each}
      </ul>
      <div>
        {#if selectedLicenseAt !== null}
          {@const license = licenses[selectedLicenseAt]}
          <a href={license.longTermsURL}>Full authoritative terms</a>
          <h3>TL;DR of Terms</h3>
          <ul>
            {#each license.shortTerms as shortTerm}
              <li>{shortTerm}</li>
            {/each}
          </ul>
        {:else}
          <span>Hover a license for a summary of its terms</span>
        {/if}
      </div>
    </div>
  </Section>
</main>
