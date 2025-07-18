<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";

const sidebarNav = ref(null);

function openNav() {
  sidebarNav.value.classList.toggle("active");
}

function closeNav() {
  if (sidebarNav.value.classList.contains("active")) {
    sidebarNav.value.classList.remove("active");
  }
}

onMounted(() => {
  const mainElement = document.querySelector("main");
  mainElement.addEventListener("click", closeNav);
});

onUnmounted(() => {
  const mainElement = document.querySelector("main");
  mainElement.removeEventListener("click", closeNav);
});
</script>

<template>
  <div class="sidebar">
    <RouterLink to="/" class="logo">
      <h1 class="sidebar-title">Rick and Morty</h1>
    </RouterLink>
    <div class="menu-burger" @click="openNav">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav class="sidebar-nav" ref="sidebarNav">
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
.menu-burger {
  display: none;
}

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
  text-decoration: none;
  cursor: pointer;
}

img {
  vertical-align: top;
  max-width: 100px;
}

.sidebar-title {
  font-size: var(--text-size-large);
  color: black;
  text-align: center;
}

.nav-list {
  list-style-type: none;
  font-size: var(--text-size-big);
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

.logo.router-link-active {
  pointer-events: none;
}

.nav-list-item > .router-link-active {
  background-color: var(--color-themed);
  color: var(--color-main);
  pointer-events: none;
}

@media only screen and (max-width: 825px) {
  .sidebar {
    display: flex !important;
    padding: 5px 15px;
    justify-content: space-between;
    position: fixed;
    width: 100%;
  }

  .logo {
    display: block;
    height: auto;
    border-radius: 25px;
    background-color: var(--color-main);
  }

  .logo > h1 {
    color: var(--color-themed);
  }

  .menu-burger {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 40px;
    justify-content: space-evenly;
    cursor: pointer;
  }

  .menu-burger:hover {
    opacity: 50%;
  }

  .menu-burger > span {
    background-color: var(--color-themed);
    width: 100%;
    height: 5px;
    border-radius: 15px;
  }

  .sidebar-nav {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
  }

  .sidebar-nav.active {
    display: block;
  }

  .nav-list {
    margin-top: 0;
    padding: 15px;
  }
}
</style>
