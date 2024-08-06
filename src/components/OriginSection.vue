<script setup>
import { watch, ref, reactive } from "vue";
import CharacterList from "./ui/CharacterList.vue";

const props = defineProps(["origin"]);

const originData = reactive({ value: {} });
const error = ref(null);

async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();

  return json;
}

watch(
  () => props.origin,
  async () => {
    if (props.origin.name === "unknown" || !props.origin.url) {
      originData.value = {
        name: props.origin.name,
        type: "unknown",
        dimension: "unknown",
      };
      return;
    }

    try {
      originData.value = await getData(props.origin.url);
    } catch (err) {
      error.value = err.toString();
      console.log(err);
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="origin-section">
    <h2 class="title">Origin</h2>
    <div v-if="originData.value" class="info">
      <p><span>Name: </span>{{ originData.value.name }}</p>
      <p><span>Type: </span>{{ originData.value.type }}</p>
      <p><span>Dimension: </span>{{ originData.value.dimension }}</p>
    </div>
    <div
      class="residents"
      v-if="
        originData.value.residents ? originData.value.residents.length : false
      "
    >
      <h3>Residents:</h3>
      <CharacterList
        :residentspropsarr="originData.value.residents"
        imgmaxwidth="60px"
        gridcols="3"
      />
    </div>
  </section>
</template>

<style scoped>
.residents {
  margin-top: 25px;
}

h3 {
  text-align: start;
  font-size: 1.5rem;
}
</style>
