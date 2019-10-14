import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import API_URL, { API_CREDENTIALS } from "./config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },

  get(resource, slug = null, queryParams = {}) {
    const url = slug ? `${resource}/${slug}` : `${resource}`;
    const params = { ...API_CREDENTIALS, ...queryParams };

    return Vue.axios.get(url, { params }).catch(error => {
      // console.warn(error);
      throw new Error(`[MARVEL] ApiService ${error}`);
    });
  },
};

export default ApiService;

export const CharactersService = {
  async get(slug = null, offset = 0, limit = 20) {
    const params = { offset, limit };

    return await ApiService.get('characters', slug, params);
  },

  async getComics(characterId) {
    const slug = `${characterId}/comics`;

    return await ApiService.get('characters', slug);
  },

  // getThumbnail(ressource, extension, format = "portrait_xlarge") {
  //   const url = `${ressource}/${format}.${extension}`;

  //   return Vue.axios.get(url).catch(error => {
  //     // console.warn(error);
  //     throw new Error(`[MARVEL] CharactersService ${error}`);
  //   });
  // }
};

export const ComicsService = {
  async get(slug = null, offset = 0, limit = 20) {
    const params = { offset, limit };

    return await ApiService.get('comics', slug, params);
  },

  async getById(comicId) {
    return await ApiService.get('comics', comicId);
  },

  async getCharacters(comicId) {
    const slug = `${comicId}/characters`;

    return await ApiService.get('comics', slug);
  }

};
