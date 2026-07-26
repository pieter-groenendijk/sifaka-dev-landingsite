<script>
    import FeaturesSection from "$lib/components/routes/home/features/FeaturesSection.svelte";
    import HeroSection from "$lib/components/routes/home/hero/HeroSection.svelte";
    import RoadmapSection from "$lib/components/routes/home/roadmap/RoadmapSection.svelte";
    import { contentBodyBgColor } from "./+layout.svelte";

    contentBodyBgColor.css = "var(--green)";
</script>


<HeroSection/>
<FeaturesSection/>
<RoadmapSection/>


<style>
    :global(.main) {
        background-color: var(--green);
    }
</style>
