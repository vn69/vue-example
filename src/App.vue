<template>
  <div id="app">
    <nav class="text-center nav-header">
      <router-link to="/">POS</router-link> | <router-link to="/muti-todo">Muti Todo List Undo able</router-link> | <router-link to="/demo-form">Form</router-link> |
      <!-- <router-link to="/todo-list-1">Todo List 1 (Vuex)</router-link> |
      <router-link to="/todo-list-2">Todo List 2 (Vuex)</router-link> |
      <router-link to="/fetch-data">Fetch Data</router-link> | -->
      <!-- <router-link to="/fetch-data-search">Fetch Data Search</router-link> | -->
    </nav>
    <router-view style="padding-top: 86px" />
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
  border-bottom: 1px solid #ccc;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.nav-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  background-color: white;
  width: 100%;
}
</style>
