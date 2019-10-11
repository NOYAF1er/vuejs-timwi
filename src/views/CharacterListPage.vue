<template>
  <section class="characters-list">
    list
    <pre>{{characterDataContainer}}</pre>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { FETCH_CHARACTERS } from "../store/actions.type";

export default {
  name: "characters-list",
    computed: {
    ...mapState({
      characterDataContainer: state => state.character.characterDataContainer,
      characters: state => state.character.characterDataContainer.results,
      offset: state => state.character.characterDataContainer.offset,
      limit: state => state.character.characterDataContainer.limit,
      total: state => state.character.characterDataContainer.total,
      count: state => state.character.characterDataContainer.count,
    })
  },
  created() {
    this.getAllCharacters();
  },
  methods: {
    ...mapActions("character", {
      getAllCharacters: FETCH_CHARACTERS
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
