<script lang="ts">
    let { children } = $props();

    import "./critical.css";
    import "./global.css";
</script>

<svelte:head>
    <!-- SEO -->
    <title>Sifaka.dev › Database design without grunt work</title>
    <meta name="description" content="Pragmatic database design for MongoDB, PostgreSQL and other platforms. A time-efficient, easy-to-use tool that translates intent into implementation."/>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
</svelte:head>

{@render children()}
