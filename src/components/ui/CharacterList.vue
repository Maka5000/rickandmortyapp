<script setup>
import { watch, reactive, ref } from "vue";

const props = defineProps([
  "arraydata",
  "residentspropsarr",
  "imgmaxwidth",
  "gridcols",
]);
defineEmits(["nextPageEvent", "prevPageEvent", "goPageEvent"]);

const residents = reactive({ data: [] });
const currentPage = ref(1);
const totalPages = ref(null);

const error = ref(null);
const loading = ref(false);

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

if (props.residentspropsarr) {
  watch(
    [() => props.residentspropsarr, currentPage],
    () => {
      loading.value = true;

      try {
        const chunkedArray = chunkArray(props.residentspropsarr, 6);

        totalPages.value = chunkedArray.length - 1;

        residents.data = [];

        chunkedArray[currentPage.value].forEach(async (itemURL) => {
          residents.data.push(await getData(itemURL));
        });
      } catch (err) {
        error.value = err.toString();
        console.log(error);
      } finally {
        loading.value = false;
      }
    },
    { immediate: true }
  );
}
</script>

<template>
  <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
  <li v-if="error">Error</li>
  <ul
    v-if="residentspropsarr ? residentspropsarr.length : false"
    class="char-list residents"
    :style="{ gridTemplateColumns: `repeat(${gridcols}, 1fr)` }"
  >
    <li class="list-item" v-for="(char, i) in residents.data" :key="i">
      <RouterLink class="list-item-link" :to="'/character/' + char.id">
        <img
          :style="{ maxWidth: imgmaxwidth }"
          class="list-item-img"
          :src="char.image"
          :alt="char.name"
        />
        <h2 class="char-name">{{ char.name }}</h2>
      </RouterLink>
    </li>
  </ul>
  <ul
    v-if="arraydata ? arraydata.length : false"
    class="char-list"
    :style="{ gridTemplateColumns: `repeat(${gridcols}, 1fr)` }"
  >
    <li class="list-item" v-for="char in arraydata" :key="char.id">
      <RouterLink class="list-item-link" :to="'/character/' + char.id">
        <img
          :style="{ maxWidth: imgmaxwidth }"
          class="list-item-img"
          :src="char.image"
          :alt="char.name"
        />
        <h2 class="char-name">{{ char.name }}</h2>
      </RouterLink>
    </li>
  </ul>
  <v-pagination
    class="mt-5"
    v-if="residentspropsarr ? residentspropsarr.length : false"
    :length="totalPages"
    v-model="currentPage"
  ></v-pagination>
</template>

<style scoped>
.char-list {
  display: grid;
  list-style-type: none;
  gap: 20px;
  max-width: 1050px;
}

.list-item {
  box-shadow: var(--card-shadow);
  border-radius: 25px;
  overflow: hidden;
  background-color: white;
  transition: 0.2s all ease-in-out;
}

.char-name {
  font-size: 1.3rem;
  font-weight: 400;
}

.list-item-link {
  display: flex;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: var(--color-main);
  cursor: pointer;
  transition: 0.2s all ease-in-out;
}

.list-item-link:hover {
  background-color: var(--color-main);
  color: var(--color-themed);
}

.char-name {
  padding: 0 10px;
  flex-grow: 1;
  line-height: normal;
}
</style>
