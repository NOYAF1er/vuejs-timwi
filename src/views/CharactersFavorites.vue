<template>
  <section class="favorites">
    <h2 class="favorites--title">Ma super team</h2>
    <div class="add-new-wrapper">
      <router-link class="add-btn" to="/list">Ajouter</router-link>
    </div>
    <section class="favorites--list" v-if="favorites">
      <CharacterCard
        class="favorite"
        v-for="favorite in favorites"
        :key="favorite.id"
        :character="favorite"
        :fromFavorite="true"
      ></CharacterCard>
    </section>
    <section class="loading" v-else>Chargement en cours...</section>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as fromActions from "../store/actions.type";
import CharacterCard from "../components/CharacterCard";

export default {
  name: "favorites-list",
  components: {
    CharacterCard
  },
  computed: {
    ...mapGetters("character", {
      isLoading: "isLoading",
      favorites: "favorites"
    })
  },
  created() {
    this.getFavorites();
  },
  methods: {
    ...mapActions("character", {
      getFavorites: fromActions.GET_FAVORITES,
      removeFromFavorites: fromActions.REMOVE_FROM_FAVORITES
    })
  }
};
</script>

<style scoped>
.favorites--title {
  text-align: center;
}

.add-new-wrapper {
  margin-bottom: 40px;
  text-align: center;
}

.favorites--list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
