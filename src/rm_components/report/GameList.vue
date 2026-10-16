<template>
  <div class="gameReport__list">
    <div
      v-for="(schedule, index) in filteredSchedule"
      :key="schedule.id"
      class="gameReport__item"
    >
      <div class="item__title">{{ schedule.date }}</div>
      <div class="item__content">
        <v-slide-group v-model="model" center-active class="pa-4" show-arrows>
          <v-slide-item v-for="(gameInfo, idx) in schedule.gameList" :key="idx">
            <v-card
              class="game__card"
              @click="clickGame(gameInfo, schedule.id)"
            >
              <v-card-title class="game__title">
                <span class="text__quarter">Q{{ gameInfo.quarter }}</span>
                <span class="text__result">
                  {{ gameInfo.result }}
                  <span v-show="gameInfo.result !== 'D'" class="text__caption"
                    >- WIN</span
                  >
                </span>
              </v-card-title>
              <v-card-text>
                <span class="text__score">{{ gameInfo.home_score }}</span>
                <span class="text__score px-3">:</span>
                <span class="text__score">{{ gameInfo.away_score }}</span>
              </v-card-text>
              <v-card-text>
                <v-badge class="mr-3" color="#ccda11" dot></v-badge>
                <template>
                  <v-chip
                    v-for="(item, i) in gameIdList[index]['home'][idx]"
                    :key="`home_${gameInfo.id}_${i}`"
                    color="white"
                    class
                    x-small
                    >{{ item.name }}</v-chip
                  >
                </template>
              </v-card-text>
              <v-card-text>
                <v-badge class="mr-3" color="#da8c11" dot></v-badge>
                <v-chip
                  v-for="(item, i) in gameIdList[index]['away'][idx]"
                  :key="`away_${gameInfo.id}_${i}`"
                  color="white"
                  x-small
                  >{{ item.name }}</v-chip
                >
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </div>
      <v-divider class="mt-3" />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: calendarMapState,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

const {
  mapState: gameMapState,
  mapMutations: gameMutations,
  mapActions: gameActions
} = createNamespacedHelpers("game");

export default {
  props: {
    gameId: {
      type: [String, Number],
      default: "" || 0
    },
    selectedYear: {
      type: String,
      default: "" || 0
    },
    selectedMonth: {
      type: String,
      default: "" || 0
    }
  },
  computed: {
    ...calendarMapState(["scheduleList"]),
    ...gameMapState(["gameList"])
  },
  watch: {
    selectedYear(year) {
      this.filteredSchedule = this.selectedFilterlingDate(this.scheduleList);
      this.divideSchduleIdInGame();
      this.setscheduleList(this.filteredSchedule);
    },
    selectedMonth(month) {
      this.filteredSchedule = this.selectedFilterlingDate(this.scheduleList);
      this.divideSchduleIdInGame();
      this.setscheduleList(this.filteredSchedule);
    }
  },
  async created() {
    await this.getScheduleList();
    this.getGameList();
  },
  data() {
    return {
      model: null,
      filteredSchedule: [],
      homeMember: ["", "", "", "", ""],
      awayMember: ["", "", "", "", ""],
      gameIdList: []
    };
  },
  methods: {
    ...calendarMapActions(["select_schedule", "get_member_squad_info"]),
    ...gameActions(["selectGameList", "getHomeTeamSquad", "getAwayTeamSquad"]),
    clickGame: function(gameInfo, scheduleId) {
      this.$router.push({
        name: "gameDetails",
        params: { game_id: gameInfo.id, schedule_id: scheduleId }
      });
    },
    getGameList: async function() {
      this.gameList = await this.selectGameList();
      this.divideSchduleIdInGame();
      this.setscheduleList(this.filteredSchedule);
    },
    getScheduleList: async function() {
      this.scheduleList = await this.select_schedule();
      this.filteredSchedule = this.selectedFilterlingDate(this.scheduleList);
    },
    selectedFilterlingDate: function(scheduleList) {
      let filteringDate = this.selectedYear + "-" + this.selectedMonth;
      if (this.selectedMonth < 10) {
        filteringDate = this.selectedYear + "-0" + this.selectedMonth;
      }
      return scheduleList.filter(
        scheduleInfo => scheduleInfo.date.indexOf(filteringDate) > -1
      );
    },
    selectedFilterlingScheduleId: function(schedule_id) {
      return this.gameList.filter(
        gameInfo => gameInfo.schedule_id == schedule_id
      );
    },
    setscheduleList: function(scheduleList) {
      let _this = this;
      scheduleList.forEach(function(dayList, idx) {
        _this.gameIdList.push({ home: [], away: [] });
        let homeSquadList = [];
        let awaySquadList = [];
        dayList.gameList.forEach(async function(item) {
          homeSquadList.push(await _this.getHomeTeamSquad(item.id));
          awaySquadList.push(await _this.getAwayTeamSquad(item.id));
        });
        _this.gameIdList[idx]["home"] = homeSquadList;
        _this.gameIdList[idx]["away"] = awaySquadList;
      });
    },
    divideSchduleIdInGame: function() {
      this.filteredSchedule.forEach(element => {
        let gameList = this.selectedFilterlingScheduleId(element.id);
        element.gameList = gameList;
      });
      this.filteredSchedule.push({});
      this.filteredSchedule.pop();
    }
  }
};
</script>

<style
  lang="scss"
  scoped
  src="@/assets/scss/components/report/gameList.scss"
></style>
