<!-- <template>
  <v-app id="app">
    <core-Toolbar v-if="!fullScreen"></core-Toolbar>
    <core-navigation v-if="!fullScreen"></core-navigation>
    <core-view></core-view>
    <core-footer v-if="!fullScreen"></core-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters("common", {
      fullScreen: "fullScreen",
    }),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style> -->

<template>
  <div>
    <h1>Welcome to Vue 3!</h1>
    <p>This is your first app with Vue 3 and Vite.</p>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
h1 {
  color: #42b983;
  text-align: center;
}
</style>
