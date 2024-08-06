<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/ui/NavBar.vue";
</script>

<template>
  <div class="container two-xl">
    <NavBar />
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

main {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dfdfdf;
}
</style>
