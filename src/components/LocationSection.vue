<script setup>
import { watch, ref, reactive } from "vue";
import DataList from "./ui/DataList.vue";

const props = defineProps(["location"]);

const locationData = reactive({ value: {} });
const error = ref(null);

async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

watch(
  () => props.location,
  async () => {
    if (props.location.name === "unknown" || !props.location.url) {
      locationData.value = {
        name: props.location.name,
        type: "unknown",
        dimension: "unknown",
      };
      return;
    }

    try {
      locationData.value = await getData(props.location.url);
    } catch (err) {
      error.value = err.toString();
      console.log(err);
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="location-section">
    <h2 class="title">Location</h2>
    <div v-if="error">Error!</div>
    <div class="info" v-if="locationData.value">
      <p class="location-name">
        <span>Name: </span>{{ locationData.value.name }}
      </p>
      <p class="location-type">
        <span>Type: </span>{{ locationData.value.type }}
      </p>
      <p class="location-dimension">
        <span>Dimension: </span>{{ locationData.value.dimension }}
      </p>
    </div>
    <div
      class="residents"
      v-if="
        locationData.value.residents
          ? locationData.value.residents.length
          : false
      "
    >
      <h3>Residents:</h3>
      <DataList :residentsArr="locationData.value.residents" gridCols="3" imgMaxWidth="60px"/>
    </div>
  </section>
</template>

<style scoped>
.residents {
  margin-top: 25px;
}

h3 {
  text-align: start;
  font-size: 1.5rem;
}
</style>
