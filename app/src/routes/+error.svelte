<script lang="ts">
  import { page } from "$app/state";
</script>

<main>
  <h1>{page.error!.message}</h1>
</main>
