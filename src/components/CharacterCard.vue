<template>
  <md-card class="character-card">
    <md-card-area>
      <md-card-media>
        <img :src="thumbnail" :alt="character.name" />
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{ character.name }}</div>
      </md-card-header>

      <md-card-content>{{ character.description }}</md-card-content>
    </md-card-area>

    <md-card-actions md-alignment="right">
      <md-button
        class="md-raised md-primary favorite-btn favorite-btn--add"
        :disabled="isFavorite(character.id)"
        @click="addToFavorites(character.id)"
        v-if="!fromFavorite"
      ><md-icon>favorite_border</md-icon> Ajouter aux favoris</md-button>
      <md-button
        class="md-raised md-primary favorite-btn favorite-btn--remove"
        @click="removeFromFavorites(character.id)"
        v-if="fromFavorite"
      ><md-icon>delete_outline</md-icon> retirer des favoris</md-button>
      <md-button class="md-raised to-details-btn" :to="'/recurring/'+character.id">Voir plus</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as fromActions from "../store/actions.type";

export default {
  name: "character-card",
  props: {
    character: { type: Object, required: true },
    fromFavorite: Boolean
  },
  computed: {
    ...mapGetters("character", {
      favorites: "favorites"
    }),
    thumbnail: function() {
      return `${this.character.thumbnail.path}/portrait_xlarge.${this.character.thumbnail.extension}`;
    }
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
.md-card {
  width: 320px;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
}
</style>
