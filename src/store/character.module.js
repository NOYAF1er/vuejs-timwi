import { CharactersService } from "../core/api.service";
import * as fromActions from "./actions.type";
import * as fromMutations from "./mutations.type";

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
  favorites: [],
  isLoading: true
};

const state = { ...initialState };

const actions = {
  [fromActions.FETCH_CHARACTERS](context, offset = 0, limit = 20) {
    context.commit(fromMutations.FETCH_START);
    return CharactersService.get(null, offset, limit)
      .then(({ data }) => {
        context.commit(fromMutations.SET_CHARACTERS, data);
        return data;
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
  [fromMutations.SET_CHARACTERS](state, response) {
    state.characterDataContainer = response;
    state.isLoading = false;
    // state.errors = {};
  },
  [fromMutations.SET_FAVORITES](state, favorites) {
    state.favorites = favorites;
    state.isLoading = false;
  }
};

const getters = {
  characters(state) {
    return state.characterDataContainer.data.results;
  },
  offset(state) {
    return state.characterDataContainer.data.offset;
  },
  limit(state) {
    return state.characterDataContainer.data.limit;
  },
  total(state) {
    return state.characterDataContainer.data.total;
  },
  count(state) {
    return state.characterDataContainer.data.count;
  },
  favorites(state) {
    return state.favorites;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
