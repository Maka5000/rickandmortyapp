<script setup>
import { reactive, ref, watch } from "vue";
import DataList from "../components/ui/DataList.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

if (!route.query.page) {
  router.push({ query: { page: 1 } });
}

const currentPage = ref(0);

const apiInfo = ref(null);
const locations = reactive({ data: [] });

const loading = ref(false);
const error = ref(null);

async function getLocations(page) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/location?page=${page}`
  );
  const json = await response.json();

  console.log("locationssHome fetched");

  return json;
}

function nextPage() {
  let page = route.query.page;

  if (route.query.page >= apiInfo.value.pages) return;

  page++;
  router.push({ query: { page: page } });
}

function prevPage() {
  let page = route.query.page;

  if (page <= 1) return;

  page--;
  router.push({ query: { page: page } });
}

function goPage(clickedPage) {
  router.push({ query: { page: clickedPage } });
}

watch(
  () => route.query.page,
  async () => {
    currentPage.value = Number(route.query.page);
    loading.value = true;
    try {
      const fetchData = await getLocations(currentPage.value);
      locations.data = fetchData.results;
      apiInfo.value = fetchData.info;
    } catch (err) {
      error.value = err.toString();
      console.log(err);
    } finally {
      loading.value = false;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <h2 class="page-title">Locations</h2>
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-if="error">Error</div>
    <DataList
      v-if="locations.data.length > 0 && loading === false"
      :locationsArr="locations.data"
      gridCols="4"
    />
    <v-pagination
      v-if="locations.data.length > 0"
      :length="apiInfo.pages"
      total-visivle="7"
      v-model="currentPage"
      @next="nextPage"
      @prev="prevPage"
      @update:modelValue="goPage"
      class="mt-7"
    ></v-pagination>
  </div>
</template>

<style scoped>
div {
  margin-top: 50px;
}

.page-title {
  font-size: 50px;
}

:deep(.list-item-link) {
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-wrap: pretty;
}

:deep(.data-list) {
  margin-top: 50px;
}

:deep(.item-name) {
  flex-grow: 0;
}
</style>
