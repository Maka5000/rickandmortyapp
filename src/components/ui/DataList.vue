<script setup>
import { reactive, watchEffect, ref } from "vue";

const props = defineProps({
  charactersArr: {
    type: Array,
    required: false,
  },
  residentsArr: {
    type: Array,
    required: false,
  },
  episodesArr: {
    type: Array,
    required: false,
  },
  locationsArr: {
    type: Array,
    required: false,
  },
  episodeCharsArr: {
    type: Array,
    required: false,
  },
  gridCols: {
    type: String,
    required: false,
  },
  imgMaxWidth: {
    type: String,
    required: false,
  },
});

const totalPages = ref(null);
const currentPage = ref(1);

const itemURL = ref(null);

function chunkArray(array, chunkSize) {
  const chunks = [];
  chunks.push([]);
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const iterableData = reactive({ array: [] });

async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

watchEffect(() => {
  if (props.charactersArr) {
    iterableData.array = props.charactersArr;
    itemURL.value = "/character/";
    return;
  }

  if (props.episodesArr) {
    itemURL.value = "/episode/";
    if (!props.episodesArr[0].name) {
      try {
        const chunkedArray = chunkArray(props.episodesArr, 6);

        totalPages.value = chunkedArray.length - 1;

        iterableData.array = [];

        chunkedArray[currentPage.value].forEach(async (episodeUrl) => {
          iterableData.array.push(await getData(episodeUrl));
        });
      } catch (error) {
        console.log(error);
      }

      return;
    }

    iterableData.array = props.episodesArr;
    return;
  }

  if (props.residentsArr) {
    itemURL.value = "/character/";
    try {
      const chunkedArray = chunkArray(props.residentsArr, 6);

      totalPages.value = chunkedArray.length - 1;

      iterableData.array = [];

      chunkedArray[currentPage.value].forEach(async (residentUrl) => {
        iterableData.array.push(await getData(residentUrl));
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }

  if (props.locationsArr) {
    itemURL.value = "/location/";
    iterableData.array = props.locationsArr;
    return;
  }

  if (props.episodeCharsArr) {
    itemURL.value = "/character/";
    try {
      const chunkedArray = chunkArray(props.episodeCharsArr, 6);

      totalPages.value = chunkedArray.length - 1;

      iterableData.array = [];

      chunkedArray[currentPage.value].forEach(async (episodeCharUrl) => {
        iterableData.array.push(await getData(episodeCharUrl));
      });
    } catch (error) {
      console.log(error);
    }

    return;
  }
});
</script>

<template>
  <ul
    class="data-list"
    :style="{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }"
  >
    <li class="list-item" v-for="item in iterableData.array">
      <RouterLink class="list-item-link" :to="itemURL + item.id">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          :style="{ maxWidth: imgMaxWidth }"
          class="list-item-img"
        />
        <h2 class="item-name">{{ item.name }}</h2>
        <span class="item-episode" v-if="item.air_date"
          >Aired: {{ item.air_date }}</span
        >
        <span class="item-type" v-if="item.type && locationsArr"
          >Type: {{ item.type }}</span
        >
      </RouterLink>
    </li>
  </ul>
  <v-pagination
    v-if="iterableData.array.length <= 6"
    :length="totalPages"
    v-model="currentPage"
    class="mt-5"
    total-visible="5"
  ></v-pagination>
</template>

<style scoped>
.data-list {
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

.item-name {
  padding: 0 10px;
  flex-grow: 1;
  line-height: normal;
  font-size: 1.3rem;
  font-weight: 400;
}

.item-episode {
  font-weight: 700;
}

.list-item-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-main);
  cursor: pointer;
  transition: 0.2s all ease-in-out;
}

.list-item-link:hover {
  background-color: var(--color-main);
  color: var(--color-themed);
}

@media only screen and (max-width: 1530px) {
  ul.data-list {
    grid-template-columns: repeat(3, 1fr) !important;
  }

  .list-item-img {
    max-width: 80px !important;
  }
}

@media only screen and (max-width: 1420px) {
  ul.data-list {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media only screen and (max-width: 1060px) {
  ul.data-list {
    grid-template-columns: 1fr !important;
    margin-top: 20px;
  }

  .list-item-img {
    max-width: 40px !important;
  }
}
</style>
