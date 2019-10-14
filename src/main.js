import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false;

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'

Vue.use(VueMaterial);

import ApiService from "./core/api.service";
import store from './store/';

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
