<template>
  <div class="field__container">
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="12" md="5" lg="5">
        <v-card class="home__container">
          <v-card-title>HOME</v-card-title>
          <v-card-text>
            <squad-soccer-field
              :position-label="homePositionLabel"
              :member-squad="homeMemberSquad"
            ></squad-soccer-field>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col align-self="center" cols="2">
        <h1>VS</h1>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="5" lg="5">
        <v-card class="away__container">
          <v-card-title>AWAY</v-card-title>
          <v-card-text>
            <squad-soccer-field
              :position-label="awayPositionLabel"
              :member-squad="awayMemberSquad"
            ></squad-soccer-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import positionValue from "@/assets/value/position.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: gameMapState,
  mapActions: gameMapAction
} = createNamespacedHelpers("game");

export default {
  props: {
    gameId: [String, Number],
    positionLabel: Array
  },
  computed: {
    ...gameMapState(["homeSquad", "awaySquad"])
  },
  created() {
    this.getHomeTeamMembers(this.game_id);
    this.getAwayTeamMembers(this.game_id);
  },
  data: () => ({
    homeMemberSquad: {},
    awayMemberSquad: {},
    homePositionLabel: positionValue.homePosition,
    awayPositionLabel: positionValue.awayPosition
  }),
  methods: {
    ...gameMapAction(["getHomeTeamSquadInfo", "getAwayTeamSquadInfo"]),
    getHomeTeamMembers: async function(game_id) {
      await this.getHomeTeamSquadInfo(game_id);
      this.translateKeyPosition(this.homeSquad, "H");
    },
    getAwayTeamMembers: async function(game_id) {
      await this.getAwayTeamSquadInfo(game_id);
      this.translateKeyPosition(this.awaySquad, "A");
    },
    translateKeyPosition: function(squadArry, teamType) {
      let squad = {};
      squadArry.forEach(squadInfo => {
        let position = squadInfo.position;
        squad[position] = squadInfo.name;
      });
      if (teamType === "H") {
        this.homeMemberSquad = squad;
      } else if (teamType === "A") {
        this.awayMemberSquad = squad;
      }
    }
  }
};
</script>

<style lang="scss"></style>
