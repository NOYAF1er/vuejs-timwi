<template>
  <section class="recurring-characters">
    <div class="loading-wraper" v-if="isLoading">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>
    <template v-else>
      <md-table v-model="comicsCharacters" md-card v-if="comicsCharacters.length > 0">
        <md-table-toolbar>
          <h1 class="md-title">Personnages apparaissant dans les mêmes comics que {{characterName}}</h1>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <!-- <md-table-cell md-label="#" md-numeric>{{ item.id }}</md-table-cell> -->
          <md-table-cell md-label="Nom">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Nombre d'apparition">{{ item.counter }}</md-table-cell>
        </md-table-row>
      </md-table>

      <md-empty-state md-rounded md-icon="blur_off" md-label="Vide" v-else>
        Il semblerait que
        <strong>{{characterName}}</strong> est toujours seul
      </md-empty-state>
    </template>
  </section>
</template>

<script>
import * as fromApi from "../core/api.service";
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      comics: [],
      isLoading: false,
      currentCharacter: null
    };
  },
  name: "recurring-characters",
  computed: {
    characterName: function() {
      return this.currentCharacter && this.currentCharacter.name;
    },
    ...mapGetters("character", {
      characters: "characters"
    }),
    comicsCharacters: function() {
      let characterList = this.comics.reduce((acc, curr) => {
        curr.characters.items.forEach(character => {
          // Get character id from resourceURI
          const splitted = character.resourceURI.split("/");
          const characterId = splitted[splitted.length - 1];

          // Add character to accumulator with a counter to 1 if isn't already present,
          // otherwise increment its counter.
          // Don't do anything if comic's character is the character that the user selected.
          if (characterId !== this.$route.params.id) {
            if (acc[characterId] !== undefined) {
              acc[characterId].counter++;
            } else {
              acc[characterId] = {
                id: characterId,
                name: character.name,
                counter: 1
              };
            }
          }
        });
        return acc;
      }, {});

      // Sort character list by counter
      characterList = Object.values(characterList).sort(
        (a, b) => b.counter - a.counter
      );

      return characterList;
    }
  },
  async created() {
    this.isLoading = true;
    this.currentCharacter = await this.getCurrentCharacter(
      this.$route.params.id
    );
    this.comics = await this.getComics(this.$route.params.id);
  },
  methods: {
    getComics: async function(charactersId) {
      const { data: response } = await fromApi.CharactersService.getComics(
        charactersId
      ).finally(() => {
        this.isLoading = false;
      });
      return response ? response.data.results : [];
    },
    getCurrentCharacter: function(characterId) {
      return this.$store.getters["character/selectedCharacter"](characterId);
    }
  }
};
</script>

<style scoped>
.loading-wraper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
