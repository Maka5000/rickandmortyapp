<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="error-container">
    <h2 class="error-title">Error!</h2>
    <p class="error-subtitle">404 : Page not found</p>
    <button class="error-btn" @click="() => router.go(-1)">&#8630;</button>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
}

.error-title {
  font-size: 50px;
}

.error-subtitle {
  font-size: 25px;
}

.error-btn {
  background-color: var(--color-main);
  color: var(--color-themed);
  width: 100%;
  max-width: 90px;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  line-height: normal;
  font-size: var(--text-size-medium);
}

.error-btn:hover {
  background-color: var(--color-themed);
  color: var(--color-main);
}
</style>
