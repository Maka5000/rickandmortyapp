import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CharacterView from "../views/CharacterView.vue";
import CharacterList from "../components/ui/CharacterList.vue";
import LocationSection from "../components/LocationSection.vue";

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
      name : "character-view",
      component: CharacterView,
    },
    {
      path: "/episodes",
      name : "episodes-view",
      component : CharacterList,
      children : [
        {
          path : ':id',
          component : LocationSection
        }
      ]
    }
  ],
});

export default router;
