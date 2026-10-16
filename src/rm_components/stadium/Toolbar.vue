<template>
  <v-app-bar flat color="white">
    <v-tool-bar-title class="stadium__count grey--text"></v-tool-bar-title>
    <v-spacer />
    <v-text-field
      v-model="search"
      hide-details
      :loading="isLoading"
      placeholder="경기장명 또는 주소명으로 검색"
      prepend-icon="fas fa-search"
      single-line
    />
    <v-btn class="mx-2" fab dark small color="primary" @click="moveAddPage()">
      <v-icon dark>fas fa-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: stadiuMapState,
  mapMutations: stadiumMapMutations
} = createNamespacedHelpers("stadium");

export default {
  data: () => ({
    model: null,
    search: null,
    isLoading: false
  }),
  computed: {
    ...stadiuMapState(["stadiumList", "searchResult"])
  },
  watch: {
    search(val) {
      this.searchList(val);
    }
  },
  methods: {
    ...stadiumMapMutations(["SET_SEARCH_RESULT"]),
    moveAddPage() {
      this.$router.push({
        name: "stadiumAdd"
      });
    },
    searchList(val) {
      if (val !== "" && val.length !== 0) {
        const result = this.stadiumList.filter(item => {
          let name = item.name;
          let address = item.address;
          return name.indexOf(val) > -1 || address.indexOf(val) > -1;
        });
        this.SET_SEARCH_RESULT(result);
      } else {
        this.SET_SEARCH_RESULT(this.stadiumList);
      }
    }
  }
};
</script>

<style></style>
