<script>
    import FeaturesSection from "$lib/components/routes/home/features/FeaturesSection.svelte";
    import HeroSection from "$lib/components/routes/home/hero/HeroSection.svelte";
    import RoadmapSection from "$lib/components/routes/home/roadmap/RoadmapSection.svelte";
</script>


<main>
    <HeroSection/>
    <FeaturesSection/>
    <RoadmapSection/>
</main>


<style>
    main {
        background-color: var(--green);
    }
</style>