<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/ui/NavBar.vue";
</script>

<template>
  <div class="container">
    <NavBar />
    <main>
      <RouterView></RouterView>
    </main>
    <footer>
      <ul class="footer-list">
        <li class="footer-list-item">
          <a class="footer-link github" href="https://github.com/Maka5000"></a>
        </li>
        <li class="footer-list-item">
          <a
            class="footer-link linkedin"
            href="https://www.linkedin.com/in/magzhanhasenov/"
          ></a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: 100vh;
}

main {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dfdfdf;
  min-height: 880px;
}

:deep(div.main_div) {
  max-width: 1050px;
  width: 100%;
  margin-top: 50px;
  flex-grow: 1;
}

footer {
  background-color: var(--color-main);
  grid-column: span 2;
}

.footer-list {
  list-style-type: none;
  display: flex;
  padding: 10px;
  column-gap: 10px;
  justify-content: end;
}

.footer-link {
  display: inline-block;
  width: 35px;
  height: 35px;
}

.footer-link.github {
  background-image: url("/github.svg");
  background-repeat: no-repeat;
  background-size: contain;
  filter: invert(1);
}

.footer-link.linkedin {
  background-image: url("/linkedin.svg");
  background-repeat: no-repeat;
  background-size: contain;
  filter: invert(1);
}

@media only screen and (max-width: 1530px) {
  :deep(div.main_div) {
    max-width: 1000px;
  }
}

@media only screen and (max-width: 1420px) {
  :deep(div.main_div) {
    max-width: 750px;
  }
}

@media only screen and (max-width: 1060px) {
  :deep(div.main_div) {
    max-width: 500px;
  }
}

@media only screen and (max-width: 825px) {
  .container {
    display: block;
  }

  :deep(.sidebar) {
    display: none;
  }

  :deep(div.main_div) {
    max-width: 400px;
    margin-top: 58px;
  }

  :deep(.page-title) {
    font-size: 3rem;
  }
}
</style>
