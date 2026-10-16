<template>
  <div>
    <v-app-bar flat color="white" class="pa-0">
      <h3 class="mr-5">{{ title }}</h3>
      <v-spacer />
      <v-text-field
        v-model="search"
        hide-details
        placeholder="팀 이름으로 검색"
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
        @click="moveTeamAdd()"
      >
        <v-icon dark>fas fa-plus</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: teamMapState } = createNamespacedHelpers("team");
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
    ...teamMapState(["teamType", "teamList", "unitTeamList"]),
    ...commonMapState(["searchResult"])
  },
  watch: {
    search(val) {
      this.searchList(val);
    }
  },
  methods: {
    ...commonMapMutations(["SET_SEARCH_RESULT"]),
    searchList: async function(val) {
      if (this.teamType === "Team") {
        this.searchTeamResultList(val);
      } else {
        this.searchUnitTeamResultList(val);
      }
    },
    searchTeamResultList(val) {
      if (val !== "" && val.length !== 0) {
        const result = this.teamList.filter(item => {
          let name = item.name;
          return name.indexOf(val) > -1;
        });
        this.SET_SEARCH_RESULT(result);
      } else {
        this.SET_SEARCH_RESULT(this.teamList);
      }
    },
    searchUnitTeamResultList(val) {
      if (val !== "" && val.length !== 0) {
        const result = this.unitTeamList.filter(item => {
          let name = item.name;
          return name.indexOf(val) > -1;
        });
        this.SET_SEARCH_RESULT(result);
      } else {
        this.SET_SEARCH_RESULT(this.unitTeamList);
      }
    },
    moveTeamAdd() {
      this.$router.push("/teamAdd");
    }
  }
};
</script>
<style></style>
