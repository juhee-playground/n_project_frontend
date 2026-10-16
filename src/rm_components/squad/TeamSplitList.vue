<template>
  <v-card class="py-2">
    <v-card-title>순번</v-card-title>
    <v-card-text>
      <v-select v-model="teamSplitSelected" :items="teamSplitList" />
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: squadState,
  mapMutations: squadMutations,
  mapActions: squadActions
} = createNamespacedHelpers("squad");
const { mapMutations: calendarMutations } = createNamespacedHelpers("calendar");
export default {
  data: () => ({}),
  computed: {
    ...squadState(["teamSplitList"]),
    teamSplitSelected: {
      get() {
        return this.$store.state.squad.teamSplitSelected;
      },
      set(value) {
        this.SET_TEAM_INDEX_CHANGED(value);
      }
    }
  },

  methods: {
    ...squadMutations(["SET_TEAM_INDEX_CHANGED"])
  }
};
</script>

<style></style>
