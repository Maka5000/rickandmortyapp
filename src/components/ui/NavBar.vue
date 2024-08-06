<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="sidebar">
    <div class="logo">
      <!-- <img src="/portal.png" alt="portal"> -->
      <h1 class="sidebar-title">Rick and Morty</h1>
    </div>
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-list-item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="nav-list-item">
          <RouterLink to="/episodes">Episodes</RouterLink>
        </li>
        <li class="nav-list-item">
          <RouterLink to="/locations">Locations</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: var(--color-main);
}

.logo {
  position: relative;
  height: 200px;
  background-color: var(--color-themed);
  border-radius: 0 0 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  vertical-align: top;
  max-width: 100px;
}

.sidebar-title {
  font-size: 50px;
  color: black;
}

.nav-list {
  list-style-type: none;
  font-size: 40px;
  text-align: center;
  background-color: var(--color-main);
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 15px;
  padding: 0 15px;
  margin-top: 50px;
}

.nav-list-item > a {
  background-color: var(--color-main-brighter);
  text-decoration: none;
  color: var(--color-themed);
  transition: 0.2s all ease-in-out;
  display: block;
  border-radius: 10px;
}

.nav-list-item > a:hover {
  cursor: pointer;
  background-color: var(--color-themed);
  color: var(--color-main);
}

.nav-list-item > .router-link-active {
  background-color: var(--color-themed);
  color: var(--color-main);
}
</style>
