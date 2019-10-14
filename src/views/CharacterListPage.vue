<template>
  <section class="characters">
    <h2 class="md-display-1 characters--title">Liste des personnages</h2>
    <template v-if="characters">
      <section class="characters--list">
        <CharacterCard
          class="character"
          v-for="character in characters"
          :key="character.id"
          :character="character"
        ></CharacterCard>
      </section>
      <infinite-loading spinner="spiral" @infinite="infiniteHandler"></infinite-loading>
    </template>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import * as fromActions from "../store/actions.type";
import CharacterCard from "../components/CharacterCard";

const PAGE_CONTENT_NUMBER = 20;

export default {
  name: "characters-list",
  components: {
    InfiniteLoading,
    CharacterCard
  },
  computed: {
    ...mapGetters("character", {
      characters: "characters",
      limit: "limit",
      offset: "offset"
    })
  },
  created() {
    this.fetchCharacters();
    this.getFavorites();
  },
  methods: {
    ...mapActions("character", {
      fetchCharacters: fromActions.FETCH_CHARACTERS,
      infinitFetchCharacters: fromActions.INFINITE_HANDLER,
      getFavorites: fromActions.GET_FAVORITES,
      addToFavorites: fromActions.ADD_TO_FAVORITES,
      removeFromFavorites: fromActions.REMOVE_FROM_FAVORITES
    }),
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
.characters--title {
  text-align: center;
}
</style>
