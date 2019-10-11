import { CharactersService } from "../core/api.service";
import { FETCH_CHARACTERS } from "./actions.type";
import { SET_CHARACTERS, FETCH_START } from "./mutations.type";

/**
 * https://developer.marvel.com/docs#!/public/getCreatorCollection_get_0
 * 
 */

const initialState = {
  errors: {},
  characterDataContainer: {
    offset: 0,
    limit: 20,
    total: 0,
    count: 0,
    results: []
  },
  isLoading: true
};

const state = { ...initialState };

const actions = {
  [FETCH_CHARACTERS](context) {
    context.commit(FETCH_START);
    return CharactersService.get(null)
      .then(({ data }) => {
        context.commit(SET_CHARACTERS, data);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  }
};

const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [SET_CHARACTERS](state, response) {
    state.characterDataContainer = response;
    state.isLoading = false;
    // state.errors = {};
  }
};

const getters = {
  characters(state) {
    return state.characterDataContainer.results;
  },
  offset(state) {
    return state.characterDataContainer.offset;
  },
  limit(state) {
    return state.characterDataContainer.limit;
  },
  total(state) {
    return state.characterDataContainer.total;
  },
  count(state) {
    return state.characterDataContainer.count;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
