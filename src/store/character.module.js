import { CharactersService } from "../core/api.service";
import * as fromActions from "./actions.type";
import * as fromMutations from "./mutations.type";

/**
 * https://developer.marvel.com/docs
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
  favorites: [],
  isLoading: true
};

const state = { ...initialState };

const actions = {
  [fromActions.FETCH_CHARACTERS](context, offset = 0, limit = 20) {
    context.commit(fromMutations.FETCH_START);
    return CharactersService.get(null, offset, limit)
      .then(({ data: response }) => {
        context.commit(fromMutations.SET_CHARACTERS, response.data);
        return response;
      })
      .catch(error => {
        // eslint-disable-next-line
        console.warn(error)
        // context.commit(SET_ERROR, errors)
      });
  },

  [fromActions.INFINITE_HANDLER](context, offset = 0, limit = 20) {
    return CharactersService.get(null, offset, limit)
      .then(({ data: response }) => {
        context.commit(fromMutations.INFINITE_SET_CHARACTERS, response.data);
        return response
      })
      .catch(error => {
        // eslint-disable-next-line
        console.warn(error)
        // context.commit(SET_ERROR, errors)
      });
  },

  [fromActions.GET_FAVORITES](context) {
    context.commit(fromMutations.FETCH_START);
    if (localStorage.getItem('favorites')) {
      let favorites = JSON.parse(localStorage.getItem('favorites'));
      context.commit(fromMutations.SET_FAVORITES, favorites);
    }
  },

  [fromActions.ADD_TO_FAVORITES](context, characterId) {
    context.commit(fromMutations.FETCH_START);
    try {
      const character = context.getters.characters.find(item => item.id === characterId);
      const valueToSave = {
        id: character.id,
        name: character.name,
        description: character.description,
        thumbnail: character.thumbnail
      }
      let favorites;

      if (localStorage.getItem('favorites')) {
        favorites = JSON.parse(localStorage.getItem('favorites'));
        favorites.push(valueToSave);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } else {
        favorites = JSON.stringify([valueToSave]);
        localStorage.setItem('favorites', favorites);
      }
      context.commit(fromMutations.SET_FAVORITES, favorites);
    } catch (error) {
      // eslint-disable-next-line
      console.warn(error)
      // context.commit(SET_ERROR, errors)
    }
  },

  [fromActions.REMOVE_FROM_FAVORITES](context, characterId) {
    context.commit(fromMutations.FETCH_START);
    try {
      if (localStorage.getItem('favorites')) {
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        favorites = favorites.filter(
          item => item.id !== characterId
        );
        localStorage.setItem('favorites', JSON.stringify(favorites));
        context.commit(fromMutations.SET_FAVORITES, favorites);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.warn(error)
      // context.commit(SET_ERROR, errors)
    }
  }

};

const mutations = {
  [fromMutations.FETCH_START](state) {
    state.isLoading = true;
  },
  [fromMutations.SET_CHARACTERS](state, payload) {
    state.characterDataContainer = payload;
    state.isLoading = false;
    // state.errors = {};
  },
  [fromMutations.INFINITE_SET_CHARACTERS](state, payload) {
    state.characterDataContainer = {
      ...state.characterDataContainer,
      offset: payload.offset,
      limit: payload.limit,
      count: payload.count,
      total: payload.total,
      results: [...state.characterDataContainer.results, ...payload.results]
    }
    state.isLoading = false;
    // state.errors = {};
  },
  [fromMutations.SET_FAVORITES](state, favorites) {
    state.favorites = favorites;
    state.isLoading = false;
  }
};

const getters = {
  isLoading: state => state && state.isLoading,
  characters: state => state && state.characterDataContainer && state.characterDataContainer.results,
  offset: state => state && state.characterDataContainer && state.characterDataContainer.offset,
  limit: state => state && state.characterDataContainer && state.characterDataContainer.limit,
  total: state => state && state.characterDataContainer && state.characterDataContainer.total,
  count: state => state && state.characterDataContainer && state.characterDataContainer.count,
  favorites: state => state && state.favorites,
  pages: (state, getters) => getters.total && getters.limit && Math.ceil(getters.total / getters.limit),
  currentPages: (state, getters) => getters.offset && getters.limit && Math.ceil(getters.offset / getters.limit) + 1,
  selectedCharacter: (state, getters) => (id) => {
    return getters.characters && getters.characters.find(item => {
      return item.id === parseInt(id)
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
