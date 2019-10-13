<template>
  <section class="characters">
    <h2 class="characters--title">Liste des personnages</h2>
    <section class="characters--list" v-if="characters">
      <article class="character" v-for="character in characters" :key="character.id">
        <header class="name">{{ character.name }}</header>
        <div
          class="thumbnail"
          :style="{'background-image': 'src(' + character.thumbnail + ')', 'background-position': 'center', 'background-repeat': 'no-repeat'}"
        ></div>
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
    <section class="loading" v-else>Chargement en cours...</section>

    <div class="pagination" v-if="characters">
      <span>page {{currentPages}}/{{pages}}</span>
      <button
        class="previous"
        :disabled="isLoading || currentPages === 1"
        @click="previousPage()"
      >précédents</button>
      <button
        class="next"
        :disabled="isLoading || currentPages === pages"
        @click="nextPage()"
      >suivants</button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as fromActions from "../store/actions.type";

const PAGE_CONTENT_NUMBER = 20;

export default {
  name: "characters-list",
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
      addToFavorites: fromActions.ADD_TO_FAVORITES,
      removeFromFavorites: fromActions.REMOVE_FROM_FAVORITES
    }),
    nextPage: async function() {
      if (this.currentPages >= this.pages) {
        return;
      }
      await this.fetchCharacters(this.offset + PAGE_CONTENT_NUMBER, this.limit);
    },
    previousPage: async function() {
      if (this.offset <= 0) {
        return;
      }
      await this.fetchCharacters(this.offset - PAGE_CONTENT_NUMBER, this.limit);
    },
    isFavorite: function(characterId) {
      return this.favorites.some(item => item.id === characterId);
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

.thumbnail {
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
