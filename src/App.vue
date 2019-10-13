<template>
  <div id="app">
    <header class="menu">
      <router-link class="menu--item" to="/">Accueil</router-link>
      <router-link class="menu--item" to="/list">Liste des personnages</router-link>
      <router-link class="menu--item" to="/favorites">Liste des favoris</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.menu--item:hover {
  text-decoration: none;
}

.menu--item + .menu--item {
  margin-left: 20px;
}
</style>
