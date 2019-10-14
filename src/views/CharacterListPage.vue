<template>
  <section class="characters">
    <h2 class="characters--title">Liste des personnages</h2>
    <template v-if="characters">
      <section class="characters--list">
        <article class="character" v-for="character in characters" :key="character.id">
          <header class="name">{{ character.name }}</header>
          <Thumbnail
            class="thumbnail-wrapper"
            :path="character.thumbnail.path"
            :extension="character.thumbnail.extension"
          ></Thumbnail>
          <div class="description">{{ character.description }}</div>
          <div class="actions">
            <button
              class="favorite-btn favorite-btn--add"
              :disabled="isFavorite(character.id)"
              @click="addToFavorites(character.id)"
            >Ajouter aux favoris</button>
            <router-link class="to-details-btn" :to="'/recurring/'+character.id">Voir plus</router-link>
          </div>
        </article>
      </section>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </template>
    <section class="loading" v-else>Chargement en cours...</section>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import * as fromActions from "../store/actions.type";
import * as fromApi from "../core/api.service";
import Thumbnail from "../components/Thumbnail";

const PAGE_CONTENT_NUMBER = 20;

export default {
  name: "characters-list",
  components: {
    InfiniteLoading,
    Thumbnail
  },
  computed: {
    ...mapGetters("character", {
      isLoading: "isLoading",
      characters: "characters",
      favorites: "favorites",
      total: "total",
      limit: "limit",
      offset: "offset",
      pages: "pages",
      currentPages: "currentPages"
    })
  },
  created() {
    this.fetchCharacters();
  },
  methods: {
    ...mapActions("character", {
      fetchCharacters: fromActions.FETCH_CHARACTERS,
      infinitFetchCharacters: fromActions.INFINITE_HANDLER,
      addToFavorites: fromActions.ADD_TO_FAVORITES,
      removeFromFavorites: fromActions.REMOVE_FROM_FAVORITES
    }),
    isFavorite: function(characterId) {
      return this.favorites.some(item => item.id === characterId);
    },
    infiniteHandler: function($state) {
      this.infinitFetchCharacters(
        this.offset + PAGE_CONTENT_NUMBER,
        this.limit
      ).then(({ data }) => {
        if (data.results.length) {
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    }
  }
};
</script>

<style scoped>
.characters--list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.character {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  margin-bottom: 20px;
  border: 1px black solid;
}

.name {
  text-align: center;
  font-weight: 600;
  padding: 20px;
  background-color: lightslategray;
}

.thumbnail-wrapper {
  height: 250px;
}

.description {
  padding: 10px;
  text-align: justify;
}

.actions {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.favorite-btn + .favorite-btn {
  margin-top: 10px;
}

.pagination {
  text-align: right;
}
</style>
