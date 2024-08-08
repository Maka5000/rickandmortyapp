<script setup>
import DataList from "./ui/DataList.vue";

const props = defineProps(["arraydata", "gridcols"]);
</script>

<template>
  <section class="episodes">
    <h2 class="title">Episodes</h2>
    <DataList :episodesArr="arraydata" gridCols="3" />
  </section>
</template>

<style scoped>
:deep(.data-list) {
  margin-top: 25px;
}

:deep(.list-item-link) {
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-wrap: pretty;
}
</style>
