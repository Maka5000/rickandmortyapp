import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";
import EpisodesView from "../views/EpisodesView.vue";
import SingleEpisodeView from "../views/SingleEpisodeView.vue";
import LocationsView from "../views/LocationsView.vue";
import SingleLocationView from "../views/SingleLocationView.vue";
import NotFoundView from "../views/NotFoundView.vue";

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
      name : "single-episode-view",
      component: SingleEpisodeView,
    },
    {
      path: "/locations",
      name: "locations-view",
      component: LocationsView
    },
    {
      path: "/location/:id",
      name: "single-location-view",
      component: SingleLocationView
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView
    }
  ],
});

export default router;
