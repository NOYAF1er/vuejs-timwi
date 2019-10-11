import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL, API_SUFFIX } from "./config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      // console.warn(error);
      throw new Error(`[MARVEL] ApiService ${error}`);
    });
  },

  get(resource, slug = null) {
    let url = slug ? `${resource}/${slug}` : `${resource}`;
    url += API_SUFFIX;
    return Vue.axios.get(url).catch(error => {
      // console.warn(error);
      throw new Error(`[MARVEL] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[MARVEL] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const CharactersService = {
  get(slug = null) {
    return ApiService.get("characters", slug);
  }
};
