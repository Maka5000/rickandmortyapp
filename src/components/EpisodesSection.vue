<script setup>
import EpisodesList from "./ui/EpisodesList.vue";

const props = defineProps(["arraydata", "gridcols"]);
</script>

<template>
  <section class="episodes">
    <h2 class="title">Episodes</h2>
    <EpisodesList :arraydata="arraydata" gridcols="3" />
  </section>
</template>
