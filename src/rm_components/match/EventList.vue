<template>
  <v-col cols="12" xl="6" lg="6" sm="12">
    <v-card class="report__container" elevation="1" color="#cfead0">
      <v-card-title class="report__header">
        <span class="report__title">게임 기록</span>
        <span v-if="homeScore !== undefined" class="report__score">{{
          `${homeScore} : ${awayScore} `
        }}</span>
      </v-card-title>
      <v-card-text class="report__content">
        <v-timeline class="report__timeline">
          <v-timeline-item
            v-for="gameReport in gameEventList"
            :key="gameReport"
            class="report__item"
            small
            fill-dot
            color="white"
            :right="gameReport.team_type === 'A' ? true : false"
            :left="gameReport.team_type === 'H' ? true : false"
            :icon="eventTimeLineIcon[gameReport.event_type]"
            :icon-color="eventIconColor[gameReport.event_type]"
          >
            <v-chip
              class="firstEvent ma-2"
              close
              color="#dce775"
              text-color="black"
              close-icon="fas fa-times-circle"
              @click="clickUpdateEvent(gameReport)"
              @click:close="deleteButton(gameReport)"
            >
              <span class="d-none d-sm-flex px-2">{{
                gameReport.first_player_name
              }}</span>
              <span class="d-flex d-sm-none">{{
                showTwoCharAt(gameReport.first_player_name)
              }}</span>
              <v-icon
                x-small
                :style="{
                  color: eventIconColor[gameReport.event_type]
                }"
                :class="eventChipFirstIcon[gameReport.event_type]"
              ></v-icon>
              <span class="d-none d-sm-flex px-2">{{
                gameReport.last_player_name
              }}</span>
              <span class="d-flex d-sm-none">{{
                showTwoCharAt(gameReport.last_player_name)
              }}</span>
              <v-icon v-if="gameReport.last_player_name" x-small>{{
                eventChipSecondIcon[gameReport.event_type]
              }}</v-icon>
            </v-chip>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import matchValue from "@/assets/value/match.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: gameReportState,
  mapGetters: gameReportGetters,
  mapMutations: gameReportMutations,
  mapActions: gameReportActions
} = createNamespacedHelpers("gameReport");

const {
  mapState: gameState,
  mapMutations: gameMutations,
  mapActions: gameActions
} = createNamespacedHelpers("game");

export default {
  props: {
    gameEventList: {
      default: null,
      type: Object
    }
  },
  data: () => ({
    eventIconColor: matchValue.gameReportEventIconColor,
    eventTimeLineIcon: matchValue.gameReportEventTimeLineIcon,
    eventChipFirstIcon: matchValue.gameReportEventChipFirstIcon,
    eventChipSecondIcon: matchValue.gameReportEventChipSecondIcon,
    eventTypePair: matchValue.eventTypePair,
    eventTypeList: matchValue.eventTypeList
  }),
  computed: {
    ...gameState(["gameInfo"]),
    ...gameReportState(["homeScore", "awayScore"])
  },
  created() {},
  methods: {
    ...gameReportActions(["deleteGameEvent"]),
    ...gameReportMutations(["SET_EVENT_INFO"]),
    clickUpdateEvent: function(gameReport) {
      console.log("gameReport", gameReport);
      this.SET_EVENT_INFO(gameReport);
      this.$emit("changeUpdateButton");
    },
    deleteButton: async function(gameReport) {
      this.gameEventList.forEach(async (gameEvent, idx) => {
        if (gameEvent.id === gameReport.id) {
          let body = {
            gameReport_id: gameReport.id
          };
          // 게임 이벤트를 삭제하는 결과를 받아온다. 받아온 결과로 점수를 1점 뺜다.
          let result = await this.deleteGameEvent(body);
          // 이벤트가 정상적으로 삭제 될 경우에만 실행이 된다.
          const isSubtractGameScore =
            gameEvent.event_type === "Goal" || gameEvent.event_type === "O.G";
          if (result && isSubtractGameScore) {
            this.$emit("subtractGameScore", gameEvent);
          }
          this.$emit("selectEventList");
        }
      });
    },
    searchProperTimelineIcon: function(iconType) {
      return matchValue.gameReportEventTimeLineIcon[iconType];
    },
    searchProperChipIcon: function(iconType, order) {
      if (order === "first") {
        return matchValue.gameReportEventChipFirstIcon[iconType];
      } else if (order === "second") {
        return matchValue.gameReportEventChipSecondIcon[iconType];
      }
    },
    showTwoCharAt(name) {
      if (name) {
        return name.substring(0, 2);
      }
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/components/match/eventList.scss"></style>
