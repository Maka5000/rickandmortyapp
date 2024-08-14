<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import DataList from "../components/ui/DataList.vue";
import ErrorPage from "../components/ui/ErrorPage.vue";

const route = useRoute();
const router = useRouter();

if (!route.query.page) {
  router.push({ query: { page: 1 } });
}

const currentPage = ref(0);

const apiInfo = ref(null);
const characters = reactive({ data: [] });

const loading = ref(false);
const error = ref(null);

async function getCharacters(page) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );

  if (!response.ok) {
    const statusMsg =
      response.status === 404 ? "Page not found!" : response.statusText;
    throw new Error(`${response.status} - ${statusMsg}`);
  }

  const json = await response.json();

  // console.log("fetched home");

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
      const fetchedData = await getCharacters(currentPage.value);
      characters.data = fetchedData.results;
      apiInfo.value = fetchedData.info;
    } catch (err) {
      error.value = err.toString();
    } finally {
      loading.value = false;
    }
  },
  {immediate : route.query.page ? true : false}
);
</script>

<template>
  <div class="main_div">
    <h2 class="page-title">Characters</h2>
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <ErrorPage v-if="error" :errMsg="error" />
    <DataList
      v-if="characters.data.length > 0 && loading === false"
      :charactersArr="characters.data"
      gridCols="4"
      imgMaxWidth="100px"
    />
    <v-pagination
      v-if="characters.data.length > 0"
      :length="apiInfo.pages"
      total-visible="5"
      @next="nextPage"
      @prev="prevPage"
      v-model="currentPage"
      @update:modelValue="goPage"
      class="mt-7"
    ></v-pagination>
  </div>
</template>

<style scoped>
.page-title {
  font-size: var(--text-size-large);
}

:deep(.data-list) {
  margin-top: 50px;
}
</style>
