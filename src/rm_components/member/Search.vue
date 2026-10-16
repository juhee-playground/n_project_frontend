<template>
  <div>
    <v-app-bar flat color="white" class="pa-0">
      <h3 class="mr-5">{{ title }}</h3>
      <v-toolbar-title class="member__count grey--text"
        >총 {{ searchResult.length }} 명</v-toolbar-title
      >
      <v-spacer />
      <v-text-field
        v-model="search"
        hide-details
        placeholder="이름으로 검색"
        prepend-icon="fas fa-search"
        single-line
      />
      <v-btn
        v-if="isAddButton"
        class="mx-2"
        fab
        dark
        small
        color="primary"
        @click="moveMemverAdd()"
      >
        <v-icon dark>fas fa-plus</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: memberMapState } = createNamespacedHelpers("member");
const {
  mapState: commonMapState,
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    isAddButton: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    model: null,
    search: null,
    isLoading: false
  }),
  computed: {
    ...memberMapState(["memberList"]),
    ...commonMapState(["searchResult"])
  },
  watch: {
    search(val) {
      this.searchList(val);
    }
  },
  methods: {
    ...commonMapMutations(["SET_SEARCH_RESULT"]),
    searchList(val) {
      if (val !== "" && val.length !== 0) {
        const result = this.memberList.filter(item => {
          let name = item.name;
          return name.indexOf(val) > -1;
        });
        this.SET_SEARCH_RESULT(result);
      } else {
        this.SET_SEARCH_RESULT(this.memberList);
      }
    },
    moveMemverAdd() {
      this.$router.push("/memberAdd");
    }
  }
};
</script>
<style></style>
