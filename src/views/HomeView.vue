<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CharacterList from "../components/ui/CharacterList.vue";

const route = useRoute();
const router = useRouter();

if (!route.query.page) {
  router.push({ query: { page: 1 } });
}

const currentPage = ref(null);

const apiInfo = ref(null);
const characters = reactive({ data: [] });

const loading = ref(false);
const error = ref(null);

async function getCharacters(page) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const json = await response.json();

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
      const data = await getCharacters(route.query.page);
      characters.data = data.results;
      apiInfo.value = data.info;
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
  <div>
    <h2 class="page-title">Characters</h2>
    <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
    <div v-if="error">Error</div>
    <div v-if="characters.data.length">
      <CharacterList
        :arraydata="characters.data"
        imgmaxwidth="100px"
        gridcols="4"
      />
      <!-- <Pagination :infoPages="apiInfo.pages"/> -->
      <v-pagination
        :length="apiInfo.pages"
        total-visible="7"
        @next="nextPage"
        @prev="prevPage"
        v-model="currentPage"
        @update:modelValue="goPage"
        class="mt-7"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>
div {
  margin-top: 50px;
}

.page-title {
  font-size: 50px;
}

:deep(.char-list) {
  margin-top: 50px;
}
</style>
