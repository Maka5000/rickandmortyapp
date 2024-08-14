<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import DataList from "../components/ui/DataList.vue";
import ErrorPage from "../components/ui/ErrorPage.vue";

const location = ref(null);
const route = useRoute();

const loading = ref(false);
const error = ref(null);

async function getLocationByID(id) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/location/${id}`
  );

  if (!response.ok) {
    const statusMsg =
      response.status === 404 ? "Page not found!" : response.statusText;
    throw new Error(`${response.status} - ${statusMsg}`);
  }

  // console.log("singLoc fetched");

  const json = await response.json();

  return json;
}

watch(
  () => route.params.id,
  async () => {
    loading.value = true;

    try {
      location.value = await getLocationByID(route.params.id);
    } catch (err) {
      error.value = err.toString();
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <ErrorPage v-if="error" :errMsg="error" />
  <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
  <div v-if="location && !loading" class="location-container">
    <div class="location-info">
      <h2 class="location-name">{{ location.name }}</h2>
      <ul class="location-info-list">
        <li class="location-list-item">
          <span>Type: </span> {{ location.type }}
        </li>
        <li class="location-list-item">
          <span>Dimension: </span> {{ location.dimension }}
        </li>
      </ul>
    </div>
    <section>
      <h2 class="title">Residents</h2>
      <DataList
        :residentsArr="location.residents"
        imgMaxWidth="60px"
        gridCols="3"
      />
    </section>
  </div>
</template>

<style scoped>
.location-container {
  max-width: 800px;
  margin-top: 50px;
}

.location-name {
  font-size: var(--text-size-extra);
}

.location-info-list {
  list-style-type: none;
  text-align: start;
}

.location-list-item {
  font-size: 2rem;
}

.location-list-item > span {
  font-weight: 700;
}

section {
  margin-top: 25px;
}

.title {
  font-size: var(--text-size-medium-large);
  border-bottom: 2px solid black;
}

:deep(.data-list) {
  margin-top: 25px;
}

@media only screen and (max-width: 825px) {
  .location-container {
    max-width: 350px;
    margin-top: 70px;
  }
}
</style>
