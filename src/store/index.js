import Vue from "vue";
import Vuex from "vuex";

import character from "./character.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    character,
  }
});