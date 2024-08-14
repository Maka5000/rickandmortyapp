<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import OriginSection from "../components/OriginSection.vue";
import LocationSection from "../components/LocationSection.vue";
import EpisodesSection from "../components/EpisodesSection.vue";
import ErrorPage from "../components/ui/ErrorPage.vue";

const route = useRoute();
const character = ref(null);
const error = ref(null);
const loading = ref(false);

async function getCharByID(id) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  if (!response.ok) {
    const statusMsg =
      response.status === 404 ? "Page not found!" : response.statusText;
    throw new Error(`${response.status} - ${statusMsg}`);
  }

  const json = await response.json();

  return json;
}

watch(
  () => route.params.id,
  async () => {
    loading.value = true;

    try {
      character.value = await getCharByID(route.params.id);
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
  <v-progress-circular class="mt-25" v-if="loading" indeterminate></v-progress-circular>
  <ErrorPage v-if="error" :errMsg="error" />
  <div v-if="character" class="char-container">
    <img class="char-image" :src="character.image" :alt="character.name" />
    <div class="char-info">
      <h2 class="char-name">{{ character.name }}</h2>
      <ul class="char-info-list">
        <li class="char-list-item">
          <span>Species: </span>{{ character.species }}
        </li>
        <li class="char-list-item" v-if="character.type">
          <span>Type: </span>{{ character.type }}
        </li>
        <li class="char-list-item">
          <span>Gender: </span>{{ character.gender }}
        </li>
        <li
          class="char-list-item"
          :style="
            character.status === 'Alive'
              ? { color: 'green' }
              : character.status === 'Dead'
              ? { color: 'red' }
              : { color: 'yellow' }
          "
        >
          <span>Status: </span>{{ character.status }}
        </li>
      </ul>
    </div>
    <div class="section-container">
      <OriginSection :origin="character.origin" />
      <LocationSection :location="character.location" />
      <EpisodesSection :arraydata="character.episode" gridcols="4" />
    </div>
  </div>
</template>

<style scoped>
.char-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 800px;
  margin-top: 50px;
}

.char-image {
  vertical-align: top;
  border-radius: 15px;
}

.char-name {
  font-size: 3rem;
  line-height: normal;
  margin-bottom: 15px;
}

.char-list-item {
  font-size: 2rem;
}

.char-list-item > span {
  font-weight: 700;
  color: var(--color-main);
}

.char-info-list {
  list-style-type: none;
}

.section-container {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  margin-bottom: 50px;
}

/* SECTIONS */
section :deep(.title) {
  font-size: 3rem;
  border-bottom: 2px solid black;
}

section :deep(.info) {
  text-align: start;
}

section :deep(p) {
  font-size: 1.6rem;
}

section :deep(p > span) {
  font-weight: 700;
}

@media only screen and (max-width: 1060px) {
  .char-image {
    grid-column: span 2;
    justify-self: center;
  }

  .char-info {
    grid-column: span 2;
    justify-self: center;
  }
}

@media only screen and (max-width: 825px) {
  .char-container {
    margin-top: 70px;
    max-width: 350px;
  }

  .char-info {
    margin-bottom: 15px;
  }
}
</style>
