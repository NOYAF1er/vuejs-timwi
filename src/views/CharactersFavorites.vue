<template>
  <section class="favorites">
    <h2 class="favorites--title">Ma super team</h2>
    <div class="add-new-wrapper">
      <router-link class="add-btn" to="/list">Ajouter</router-link>
    </div>
    <section class="favorites--list" v-if="favorites">
      <article class="favorite" v-for="favorite in favorites" :key="favorite.id">
        <header class="name">{{ favorite.name }}</header>
        <div
          class="thumbnail"
          :style="{'background-image': 'src(' + favorite.thumbnail + ')', 'background-position': 'center', 'background-repeat': 'no-repeat'}"
        ></div>
        <div class="description">{{ favorite.description }}</div>
        <div class="actions">
          <button
            class="favorite-btn favorite-btn--remove"
            @click="removeFromFavorites(favorite.id)"
          >retirer des favoris</button>
          <router-link class="to-details-btn" :to="'/recurring/'+favorite.id">Voir plus</router-link>
        </div>
      </article>
    </section>
    <section class="loading" v-else>Chargement en cours...</section>
  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import * as fromActions from "../store/actions.type";

export default {
  name: "favorites-list",
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
.add-new-wrapper {
  margin-bottom: 20px;
  text-align: center;
}

.favorites--list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.favorite {
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
</style>
