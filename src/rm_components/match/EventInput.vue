<template>
  <v-col cols="12" xl="6" lg="6" sm="12">
    <v-card class="home__container" elevation="1">
      <v-card-title class="home__header">HOME</v-card-title>
      <v-card-text class="home__content">
        <v-row justify="center">
          <v-col
            v-for="player in homeMembers"
            :key="player"
            cols="4"
            align-self="center"
          >
            <div>
              <v-btn
                rounded
                small
                :color="
                  player.position !== 'JK'
                    ? 'lime lighten-2'
                    : 'light blue lighten-2'
                "
                @click="clickPlayer(player, 'H')"
                >{{ player.name }}</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="input__container" outlined evalation="2">
      <v-card-text>
        <v-row justify="center">
          <v-col
            v-for="eventType in eventTypeList"
            :key="eventType"
            cols="6"
            xl="3"
            lg="3"
            md="3"
            align-self="center"
          >
            <div>
              <v-btn
                dark
                rounded
                small
                color="tertiary"
                @click="clickEventButton(eventType.type)"
              >
                {{ eventType.name }}
                <v-icon
                  right
                  dark
                  :class="eventIcon[eventType.type]"
                  :color="eventIconColor[eventType.type]"
                ></v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <span class="data__text">
          <v-text-field
            v-model="time"
            class="data__time"
            label="시간"
            outlined
            hide-details
            dense
            placeholder="05:00"
          ></v-text-field>
        </span>
      </v-card-text>
      <v-card-text class="label__container">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="6" md="3">
              <div class="label__text">상태</div>
              <div class="data__text fixed__type">{{ firstEventType }}</div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="label__text">선수1</div>
              <v-chip class="ma-2" close @click:close="deleteFirstPlayer">{{
                firstPlayer
              }}</v-chip>
            </v-col>
            <v-col cols="6" md="3">
              <div class="label__text">상태</div>
              <div class="data__text fixed__type">{{ lastEventType }}</div>
            </v-col>
            <v-col cols="6" md="3">
              <div class="label__text">선수2</div>
              <v-chip
                v-if="
                  firstEventType === 'Goal' ||
                    firstEventType === 'Out' ||
                    firstEventType === 'K.O'
                "
                class="ma-2"
                close
                @click:close="deleteLastPlayer"
                >{{ lastPlayer }}</v-chip
              >
            </v-col>
          </v-row>
          <v-row class="action__container">
            <v-col cols="6">
              <v-btn class="my-1" @click="init">
                취소
                <v-icon class="pl-2" small dark>fas fa-eraser</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn class="my-1" color="primary" @click="clickButton()">
                {{ buttonName }}
                <v-icon class="pl-2" small dark>fas fa-pencil-alt</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card class="away__container" elevation="1">
      <v-card-title class="away__header">AWAY</v-card-title>
      <v-card-text class="away__content">
        <v-row justify="center">
          <v-col
            v-for="player in awayMembers"
            :key="player"
            cols="4"
            align-self="center"
          >
            <v-btn
              rounded
              small
              :color="
                player.position !== 'JK'
                  ? 'lime lighten-2'
                  : 'light blue lighten-2'
              "
              @click="clickPlayer(player, 'A')"
              >{{ player.name }}</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import moment from "moment";
import matchValue from "@/assets/value/match.json";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: prepareMatchState,
  mapGetters: prepareMatchGetters,
  mapMutations: prepareMatchMutations,
  mapActions: prepareMatchActions
} = createNamespacedHelpers("prepareMatch");

const {
  mapState: gameState,
  mapMutations: gameMutations,
  mapActions: gameActions
} = createNamespacedHelpers("game");

const {
  mapState: gameReportState,
  mapGetters: gameReportGetters,
  mapMutations: gameReportMutations,
  mapActions: gameReportActions
} = createNamespacedHelpers("gameReport");

const { mapGetters: accountMapGetters } = createNamespacedHelpers("account");

export default {
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // 이벤트 기록 영역
    buttonName: "추가",
    isGoal: true,
    firstEventType: "Goal",
    lastEventType: "Assist",
    firstPlayer: null,
    lastPlayer: null,
    firstPlayerChip: true,
    lastPlayerChip: true,
    firstPlayerId: null,
    lastPlayerId: null,
    teamType: null,
    time: "",
    homePlayerList: [],
    awayPlayerList: [],
    eventTypeList: matchValue.eventTypeList,
    eventTypePair: matchValue.eventTypePair,
    eventIcon: matchValue.gameReportEventTimeLineIcon,
    eventIconColor: matchValue.gameReportEventIconColor
  }),
  computed: {
    ...accountMapGetters(["userInfo"]),
    ...gameState(["gameInfo"]),
    ...gameReportState([
      "eventList",
      "gameReportEventInfo",
      "homeScore",
      "awayScore"
    ]),
    ...prepareMatchState(["homeMembers", "awayMembers"]),
    isSingleType() {
      return this.lastEventType === "";
    }
  },
  watch: {
    isUpdate: function() {
      if (this.isUpdate) {
        this.buttonName = "수정";
      } else {
        this.init();
        this.buttonName = "추가";
      }
    },
    gameReportEventInfo: function() {
      if (this.isUpdate) {
        this.buttonName = "수정";
        // 상태를 변경하고 데이터를 세팅해준다.
        this.setGameReportInfo(this.gameReportEventInfo);
      } else {
        this.init();
        this.buttonName = "추가";
      }
    }
  },
  async created() {
    await this.$emit("getHomeAwayMemberList");
  },
  methods: {
    ...gameReportActions([
      "getEventList",
      "addGameEvent",
      "getEventInfo",
      "updateGameEvent"
    ]),
    ...gameReportMutations([
      "ADD_EVENT",
      "ADD_HOME_SCORE",
      "ADD_AWAY_SCORE",
      "SET_EVENT_INFO"
    ]),
    ...gameActions(["updateGameScore"]),
    addGameScore: function(eventInfo) {
      const awayPlusScore =
        (eventInfo.event_type === "O.G" && eventInfo.team_type === "H") ||
        (eventInfo.event_type === "Goal" && eventInfo.team_type === "A");

      if (awayPlusScore) {
        this.ADD_AWAY_SCORE(1);
      } else {
        this.ADD_HOME_SCORE(1);
      }

      this.$emit("updateGameInfo");
    },
    clickPlayer: function(val, type) {
      if (this.teamType !== null && this.teamType !== type) {
        alert("같은 팀을 선택해주세요.");
        this.init();
        return;
      }
      if (this.firstPlayer !== null && this.firstPlayer === val.name) {
        alert("같은 사람을 선택할 수 없습니다.");
        this.init();
        return;
      }
      this.teamType = type;
      if (this.isSingleType || this.firstPlayer === null) {
        this.firstPlayer = val.name;
        this.firstPlayerId = val.member_id;
      } else {
        this.lastPlayer = val.name;
        this.lastPlayerId = val.member_id;
      }
    },
    clickButton: async function() {
      let event = {
        time: this.time,
        event_type: this.firstEventType,
        first_player: this.firstPlayerId,
        team_type: this.teamType
      };
      if (!this.isSingleType) {
        event.last_player = this.lastPlayerId;
      }
      if (this.isUpdate) {
        await this.clickUpdateButton(event);
      } else {
        await this.clickSaveButton(event);
      }
      // input 창 초기화
      this.init();
      // 경기기록 리스트 다시 불러와주기
      this.$emit("selectEventList");
    },
    clickEventButton: function(eventfirstType) {
      this.firstEventType = eventfirstType;
      this.lastEventType = this.eventTypePair[eventfirstType];
      console.log("this.lastEventType", this.lastEventType);
      if (!this.lastEventType) {
        this.lastPlayer = "";
        this.lastPlayerId = "";
      }
    },
    clickSaveButton: async function(event) {
      event.game_id = this.gameInfo.id;
      event.user_id = this.userInfo.id;
      // 경기 기록 추가 actions
      let addGameEventresult = await this.addGameEvent(event);
      // 게임 이벤트추가 결과가 true이고 골일 경우에만 스코어를 추가시켜주기 위해서.
      const isAddGameScore =
        event.event_type === "Goal" || event.event_type === "O.G";
      if (addGameEventresult && isAddGameScore) {
        this.addGameScore(event);
      }
    },
    clickUpdateButton: async function(event) {
      console.log("update", event);
      let gameReportform = {
        gameReport_id: this.gameReportEventInfo.id,
        gameReport: event
      };
      let beforeEvent = this.gameReportEventInfo;
      // 경기 기록 추가 actions
      let updateGameEventresult = await this.updateGameEvent(gameReportform);
      /* 이벤트 타입이 변경된 경우
      beforeEventType 이 골, 자살골인 경우 스코어 변동
      event_type 이 골, 자살골인 경우 스코어 변동
     */
      //TODO: SET_EVENT_INFO 해줘야함. 초기화시키려면 여기서 초기화 시켜줘야함.
      this.SET_EVENT_INFO({
        last_player: null,
        last_player_name: "",
        last_player_uniform_number: ""
      });
      const isMinusGameScore =
        beforeEvent.event_type === "Goal" || beforeEvent.event_type === "O.G";
      const isAddGameScore =
        event.event_type === "Goal" || event.event_type === "O.G";
      if (isMinusGameScore) {
        this.$emit("subtractGameScore", beforeEvent);
      }

      if (isAddGameScore) {
        this.addGameScore(event);
      }
    },
    deleteFirstPlayer: function() {
      this.firstPlayerChip = false;
      this.firstPlayer = null;
      this.firstPlayerId = "";
    },
    deleteLastPlayer: function() {
      this.lastPlayerChip = false;
      this.lastPlayer = null;
      this.lastPlayerId = "";
    },
    init() {
      this.firstPlayer = null;
      this.firstPlayerId = null;
      this.lastPlayer = null;
      this.teamType = null;
      this.time = null;
      this.lastPlayerId = null;
      this.$emit("initSaveButton");
    },
    setGameReportInfo: function(selectedEvent) {
      this.time = selectedEvent.time;
      this.firstEventType = selectedEvent.event_type;
      this.lastEventType = matchValue.eventTypePair[selectedEvent.event_type];
      this.teamType = selectedEvent.team_type;
      this.firstPlayer = selectedEvent.first_player_name;
      this.firstPlayerId = selectedEvent.first_player;
      this.lastPlayer = selectedEvent.last_player_name;
      this.lastPlayerId = selectedEvent.last_player;
    },
    setLastEvent: function(firstType) {
      return matchValue.event_type[firstType];
    }
  }
};
</script>

<style lang="scss" src="@/assets/scss/components/match/eventInput.scss"></style>
