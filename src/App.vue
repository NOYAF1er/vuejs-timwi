<template>
  <div id="app">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary menu">
        <h3 class="md-title" style="flex: 1">My Marvel Team</h3>
        <md-button to="/" class="md-primary">Accueil</md-button>
        <md-button to="/list" class="md-primary">Liste des personnages</md-button>
        <md-button to="/favorites" class="md-primary">Ma super team</md-button>
      </md-app-toolbar>
      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import "//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";

.md-app {
  max-height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}
</style>
