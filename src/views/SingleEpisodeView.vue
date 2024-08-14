<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import DataList from "../components/ui/DataList.vue";

const episode = ref(null);
const route = useRoute();

const loading = ref(false);
const error = ref(null);

async function getEpisodeByID(id) {
  const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  const json = await response.json();

  return json;
}

watch(
  () => route.params.id,
  async () => {
    loading.value = true;

    try {
      episode.value = await getEpisodeByID(route.params.id);
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
  <div v-if="error">Error</div>
  <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
  <div v-if="episode && !loading" class="episode-container">
    <div class="episode-info">
      <h2 class="episode-name">{{ episode.name }}</h2>
      <ul class="episode-info-list">
        <li class="episode-list-item">
          <span>Episode:</span> {{ episode.episode }}
        </li>
        <li class="episode-list-item">
          <span>Aired_date:</span> {{ episode.air_date }}
        </li>
      </ul>
    </div>
    <section>
      <h2 class="title">Characters</h2>
      <DataList
        :episodeCharsArr="episode.characters"
        imgMaxWidth="60px"
        gridCols="3"
      />
    </section>
  </div>
</template>

<style scoped>
.episode-container {
  max-width: 800px;
  margin-top: 50px;
}

.episode-name {
  font-size: var(--text-size-extra);
}

.episode-info-list {
  list-style-type: none;
  text-align: start;
}

.episode-list-item {
  font-size: var(--text-size-big);
}

.episode-list-item > span {
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
  .episode-container {
    max-width: 350px;
    margin-top: 70px;
  }
}
</style>
