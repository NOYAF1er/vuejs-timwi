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
            @click="addToFavorites(character.id)"
          >Ajouter aux favoris</button>
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
import { mapState, mapActions } from "vuex";
import * as fromActions from "../store/actions.type";

const PAGE_CONTENT_NUMBER = 20;

export default {
  name: "characters-list",
  computed: {
    ...mapState({
      isLoading: state => state.character && state.character.isLoading,
      characters: state =>
        state.character &&
        state.character.characterDataContainer &&
        state.character.characterDataContainer.data &&
        state.character.characterDataContainer.data.results,
      offset: state =>
        state.character && state.character.characterDataContainer.data.offset,
      limit: state =>
        state.character && state.character.characterDataContainer.data.limit,
      total: state =>
        state.character && state.character.characterDataContainer.data.total,
      count: state =>
        state.character && state.character.characterDataContainer.data.count,
      pages: state =>
        state.character &&
        Math.round(
          state.character.characterDataContainer.data.total /
            state.character.characterDataContainer.data.limit
        ),
      currentPages: state =>
        state.character &&
        Math.ceil(
          state.character.characterDataContainer.data.offset /
            state.character.characterDataContainer.data.limit
        ) + 1,
      favorites: state => state.character && state.character.favorites
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
