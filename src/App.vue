<template>
  <div id="app">
    <nav class="text-center">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/todo-list">Todo List Undo able</router-link> |
      <router-link to="/todo-list-1">Todo List 1 (Vuex)</router-link> |
      <router-link to="/todo-list-2">Todo List 2 (Vuex)</router-link> |
      <router-link to="/fetch-data">Fetch Data</router-link> |
      <!-- <router-link to="/fetch-data-search">Fetch Data Search</router-link> | -->
      <router-link to="/demo-form">Form</router-link> |
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
