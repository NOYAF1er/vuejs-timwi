<template>
  <section class="favorites">
    <h2 class="md-display-1 favorites--title">Ma super team</h2>
    <div class="add-new-wrapper">
      <md-button to="/list" class="md-raised md-primary"><md-icon>add</md-icon> Ajouter</md-button>
    </div>
    <section class="favorites--list" v-if="favorites">
      <template v-if="favorites.length">
        <CharacterCard
          class="favorite"
          v-for="favorite in favorites"
          :key="favorite.id"
          :character="favorite"
          :fromFavorite="true"
        ></CharacterCard>
      </template>

      <md-empty-state
        md-icon="cancel_presentation"
        md-label="Super team vide"
        md-description="Il semble que vous n'ayez pas encore constituer votre super team."
        v-else
      >
        <md-button to="/list" class="md-raised md-primary">Faire votre choix</md-button>
      </md-empty-state>
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
</style>
