<template>
  <section class="recurring-characters">
    <div class="loading" v-if="isLoading">Chargement en cours...</div>
    <template v-else>
      <table class="table" v-if="comicsCharacters.length > 0">
        <caption>Personnages apparaissant dans les même comics que {{characterName}}</caption>
        <thead class="table--header">
          <td>#</td>
          <td>Nom</td>
          <td>Nombre d'apparition</td>
        </thead>
        <tr class="table--row" v-for="(character, index) in comicsCharacters" :key="character.id">
          <td>{{index+1}}</td>
          <td>{{character.name}}</td>
          <td>{{character.counter}}</td>
        </tr>
      </table>
      <div class="empty" v-else>Il semble que {{characterName}} est tout seul dans ses comics</div>
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
.loading {
  text-align: center;
}

.table {
  width: 100%;
}
</style>
