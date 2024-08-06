<script setup>
import { RouterLink } from "vue-router";
import { reactive, watch, ref } from "vue";

const props = defineProps(["arraydata", "gridcols"]);
defineEmits(["nextPageEvent", "prevPageEvent", "goPageEvent"]);

const episodes = reactive({ data: [] });
const error = ref(null);
const loading = ref(false);

const page = ref(1);

async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  chunks.push([]);
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const chunkedArray = chunkArray(props.arraydata, 6);

watch(
  page,
  () => {
    loading.value = true;

    try {
      episodes.data = [];
      chunkedArray[page.value].forEach(async (ep) => {
        episodes.data.push(await getData(ep));
      });
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
  <ul
    class="char-episodes-list"
    :style="{ gridTemplateColumns: `repeat(${gridcols}, 1fr)` }"
  >
    <li class="episodes-list-item" v-for="episode in episodes.data">
      <RouterLink :to="'/episodes/' + episode.id">
        <p>{{ episode.name }}</p>
        <p>{{ episode.episode }}</p>
      </RouterLink>
    </li>
  </ul>
  <v-pagination
    class="mt-5"
    :length="chunkedArray.length - 1"
    v-model="page"
  ></v-pagination>
</template>

<style scoped>
.char-episodes-list {
  display: grid;
  list-style-type: none;
  gap: 10px;
}

.episodes-list-item {
  box-shadow: var(--card-shadow);
  border-radius: 15px;
  align-items: center;
  overflow: hidden;
}

.episodes-list-item > a {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background-color: white;
  color: var(--color-main);
  transition: 0.2s all ease-in;
}

.episodes-list-item > a:hover {
  background-color: var(--color-main);
  color: var(--color-themed);
}

.episodes-list-item > a > p {
  font-size: 1.3rem;
  line-height: normal;
}
</style>
