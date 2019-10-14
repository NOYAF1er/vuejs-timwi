<template>
  <article class="character-card">
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
        v-if="!fromFavorite"
      >Ajouter aux favoris</button>
      <button
        class="favorite-btn favorite-btn--remove"
        @click="removeFromFavorites(character.id)"
        v-if="fromFavorite"
      >retirer des favoris</button>
      <router-link class="to-details-btn" :to="'/recurring/'+character.id">Voir plus</router-link>
    </div>
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as fromActions from "../store/actions.type";
import Thumbnail from "./Thumbnail";

export default {
  name: "character-card",
  components: {
    Thumbnail
  },
  props: {
    character: { type: Object, required: true },
    fromFavorite: Boolean
  },
  computed: {
    ...mapGetters("character", {
      favorites: "favorites"
    })
  },
  methods: {
    ...mapActions("character", {
      addToFavorites: fromActions.ADD_TO_FAVORITES,
      removeFromFavorites: fromActions.REMOVE_FROM_FAVORITES
    }),
    isFavorite: function(characterId) {
      return this.favorites.some(item => item.id === characterId);
    }
  }
};
</script>

<style scoped>
.character-card {
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
</style>
