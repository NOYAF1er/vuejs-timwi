import Vue from "vue";
import Router from "vue-router";

import HomePage from "./views/HomePage";
import Characters from "./views/Characters";
import CharacterDetails from "./views/CharacterDetails";
import CharacterListPage from "./views/CharacterListPage";
import CharactersFavorites from "./views/CharactersFavorites";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: HomePage
    },
    {
      name: "favorites",
      path: "/favorites",
      component: CharactersFavorites
    },
    {
      name: "list",
      path: "/list",
      component: CharacterListPage
    },
    {
      name: "characters",
      path: "/characters",
      component: Characters,
      children: [
        {
          name: "details",
          path: "/:slug",
          component: CharacterDetails
        }
      ]
    },

    // otherwise redirect to home
    { path: "*", redirect: "/" }
  ]
});
