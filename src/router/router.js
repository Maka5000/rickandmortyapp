import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";
import EpisodesView from "../views/EpisodesView.vue";
import SingleEpisodeView from "../views/SingleEpisodeView.vue";
import LocationsView from "../views/LocationsView.vue";
import SingleLocationView from "../views/SingleLocationView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home-view",
      component: HomeView,
    },
    {
      path: "/character/:id",
      name: "character-view",
      component: CharacterView,
    },
    {
      path: "/episodes",
      name: "episodes-view",
      component: EpisodesView,
    },
    {
      path: "/episode/:id",
      component: SingleEpisodeView,
    },
    {
      path: "/locations",
      component: LocationsView
    },
    {
      path: "/location/:id",
      component: SingleLocationView
    }
  ],
});

export default router;
