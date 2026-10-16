<template>
  <div>
    <v-container class="pitch__container">
      <v-row
        v-for="groupLine in positionLabel"
        :key="groupLine"
        justify="space-around"
        :class="`group__${groupLine}`"
      >
        <v-col
          v-for="item in groupLine"
          :key="item"
          cols="4"
          class="position__area"
        >
          <div class="position__container">
            <div class="position__label">{{ item }}</div>
            <div class="position__content">
              <v-btn
                v-if="memberSquad[item]"
                class="position__name"
                small
                fab
                depressed
                >{{ memberSquad[item] }}</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: prepareMatchState,
  mapGetters: prepareMatchGetters,
  mapMutations: prepareMatchMutations,
  mapActions: prepareMatchActions
} = createNamespacedHelpers("prepareMatch");

export default {
  props: {
    positionLabel: {
      type: Object,
      default: {}
    },
    memberSquad: Object
  },
  computed: {
    ...prepareMatchState(["homeMembers", "awayMembers"])
  },
  data: () => ({
    position: {
      GK: "",
      LB: "",
      CB: "",
      RB: "",
      LCM: "",
      CM: "",
      RCM: "",
      LW: "",
      FW: "",
      RW: ""
    }
  }),
  created() {},
  methods: {}
};
</script>

<style
  lang="scss"
  scoped
  src="@/assets/scss/components/squad/soccerField.scss"
></style>
