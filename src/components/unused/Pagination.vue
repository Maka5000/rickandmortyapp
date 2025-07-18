<script setup>
import { useRoute, useRouter } from 'vue-router';

const props = defineProps(['infoPages']);

const route = useRoute();
const router = useRouter();

function nextPage() {
  let page = route.query.page;

  if (route.query.page >= props.infoPages) return;

  page++;
  router.push({ query: { page: page } });
}

function prevPage() {
  let page = route.query.page;

  if (page <= 1) return;

  page--;
  router.push({ query: { page: page } });
}
</script>

<template>
  <div class="btns-container">
    <button type="button" class="btn prev-page" @click="prevPage" :disabled="route.query.page <= 1">
      &#10096;
    </button>
    <ul class="pagination-list">
      <li class="pagination-item" v-for="page in infoPages / 7">
        <button type="button" class="btn pagination">{{ page }}</button>
      </li>
    </ul>
    <button type="button" class="btn next-page" @click="nextPage" :disabled="route.query.page >= infoPages">
      &#10097;
    </button>
  </div>
</template>

<style scoped>
.btns-container {
  margin-top: 25px;
  display: flex;
  column-gap: 10px;
  justify-content: center;
}

.pagination-list {
  display: flex;
  max-width: 290px;
  overflow: hidden;
  list-style-type: none;
  column-gap: 3px;
}
</style>
