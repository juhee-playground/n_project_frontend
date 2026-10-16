<template>
  <v-toolbar class="toolbar__main">
    <v-btn icon @click="backPage">
      <v-icon class="fas fa-arrow-left" />
    </v-btn>
    <v-spacer />
    <v-toolbar-title>{{ tableHeader }}</v-toolbar-title>
    <v-spacer />
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Back",
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters("common", {
      fullScreen: "fullScreen"
    })
  },
  methods: {
    backPage() {
      this.$store.commit("common/SET_FULL_SCREEN", false);
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.toolbar__main {
  width: 100%;
}
</style>
