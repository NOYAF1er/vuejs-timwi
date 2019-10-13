import Vue from "vue";
import Router from "vue-router";

import HomePage from "./views/HomePage";
import CharacterListPage from "./views/CharacterListPage";
import CharactersFavorites from "./views/CharactersFavorites";
import RecurringCharacters from "./views/RecurringCharacters";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: HomePage
    },
    {
      name: "list",
      path: "/list",
      component: CharacterListPage
    },
    {
      name: "favorites",
      path: "/favorites",
      component: CharactersFavorites
    },
    {
      name: "recurring",
      path: "/recurring/:id",
      component: RecurringCharacters
    },

    // otherwise redirect to home
    { path: "*", redirect: "/" }
  ]
});
