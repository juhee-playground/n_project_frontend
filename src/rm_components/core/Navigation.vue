<template>
  <div>
    <v-navigation-drawer v-model="drawer" :temporary="true" app overflow>
      <v-list>
        <v-list-item>
          <v-list-item-content class="float-left">
            <v-list-item-title class="title">NunnuNanna</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            class="nav__item"
            :to="`${item.to}`"
          >
            <v-list-item-icon>
              <v-img :src="$imgBaseUrl + item.icon" contain width="24" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text--black" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import CoreValueItem from "../../assets/value/CoreValueItem.json";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: commonMapState,
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");

export default {
  data: () => ({
    items: CoreValueItem.navigationItems
  }),
  computed: {
    ...commonMapState(["drawer"]),
    drawer: {
      get() {
        return this.$store.state.common.drawer;
      },
      set(val) {
        this.SET_DRAWER(val);
      }
    }
  },
  mounted() {},

  methods: {
    ...commonMapMutations(["SET_DRAWER"])
  }
};
</script>

<style scoped></style>
