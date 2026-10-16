<template>
  <v-card outlined>
    <v-card-actions class="setting__actions">
      <v-list-item>
        <v-list-item-actions class="px-0">
          <v-btn dark color="primary" outlined large @click="autoTeamSplit"
            >팀나누기</v-btn
          >
          <v-btn
            dark
            color="blue"
            outlined
            large
            @click="INITIALIZE_ATTEND_MEMBER"
            >초기화</v-btn
          >
        </v-list-item-actions>

        <v-list-item-content></v-list-item-content>

        <v-list-item-icon>참석자 {{ memberCount }} 명</v-list-item-icon>
      </v-list-item>
    </v-card-actions>
    <v-card-text class>
      <v-form refs="form">
        <v-row justify="start">
          <v-col cols="12" md="6" align-self="center">
            <v-list-item two-line>
              <v-list-item-content class="text-left">
                <v-list-item-title class="pb-4">팀 수</v-list-item-title>
                <v-list-item-subtitle>
                  <v-item-group mandatory>
                    <v-item
                      v-for="item in attendTeamCount"
                      :key="item"
                      v-slot:default="{ active, toggle }"
                      class="group__item"
                    >
                      <v-btn
                        :color="active ? 'primary' : ''"
                        fab
                        elevation="0"
                        x-small
                        @click="toggle"
                        @click.native="setTeamCount(item)"
                      >
                        <v-scroll-y-transition>
                          <div
                            v-if="acitve"
                            class="flex-grow-1 text-center list__item white--text"
                          >
                            {{ item }}
                          </div>
                          <div
                            v-else
                            class="flex-grow-1 text-center list__item"
                          >
                            {{ item }}
                          </div>
                        </v-scroll-y-transition>
                      </v-btn>
                    </v-item>
                    <v-item class="group__item">
                      <v-btn
                        :color="active ? 'primary' : ''"
                        fab
                        elevation="0"
                        x-small
                        @click="addTeamCount"
                        >+</v-btn
                      >
                    </v-item>
                  </v-item-group>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" md="6" lg="6" align-self="center">
            <v-list-item two-line>
              <v-list-item-content class="text-left">
                <v-list-item-title>깍두기 여부</v-list-item-title>
                <v-list-item-subtitle>
                  <v-checkbox
                    v-model="isJoker"
                    class="mx-2"
                    color="primary"
                    label=" 깍두기 있음"
                    @change="setJoker"
                  ></v-checkbox>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <div>
        <v-btn
          v-for="(n, index) in teamCount"
          :key="index"
          class="tab__team ma-1"
          fab
          small
          outlined
          :color="colorIndex[n]"
          @click="clickTeam(n)"
          >{{ n }}</v-btn
        >
        <v-btn
          v-for="(n, index) in teamJoker"
          :key="index"
          class="tab__team ma-1"
          fab
          small
          outlined
          :color="colorIndex[0]"
          @click="clickTeam('J')"
          >{{ n }}</v-btn
        >
      </div>
      <div v-if="isJoker">깍두기 있음</div>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col>
          <span v-if="selectedTeam" class="title"
            >{{ selectedTeam }} 팀의 팀원을 선택하시오</span
          >
          <span v-if="selectedJoker" class="title">조커를 선택하시오</span>
        </v-col>
      </v-row>
      <v-row wrap justify="center">
        <v-col cols="12">
          <v-chip
            v-for="(member, index) in attendMember"
            :key="index"
            dark
            outlined
            label
            class="chip__member mx-1"
            :color="member.color"
            @click="clickMember(member)"
            >{{ member.name }}</v-chip
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="save">저장</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn color="white" text></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: commonState } = createNamespacedHelpers("common");
const {
  mapState: calendarState,
  mapMutations: calendarMutations,
  mapActions: calendarActions
} = createNamespacedHelpers("calendar");
const {
  mapState: squadState,
  mapMutations: squadMutations,
  mapActions: squadActions
} = createNamespacedHelpers("squad");
export default {
  data: () => ({
    teamCount: 2,
    attendTeamCount: [2, 3, 4, 5],
    isJoker: false,
    selectedJoker: false,
    selectedTeam: null,
    teamJoker: [],
    memberCount: 0
  }),
  computed: {
    ...calendarState(["attendMember", "scheduleIndex", "scheduleList"]),
    ...commonState(["colorIndex"]),
    ...squadState(["teamSplitSelected", "team_division"])
  },
  watch: {
    attendMember(val) {
      this.memberCount = val.length;
    }
  },
  methods: {
    ...squadActions(["saveTeamSplit"]),
    ...squadMutations(["divide_member_into_team"]),
    ...calendarMutations([
      "FILL_TEAM_NUMBER",
      "CHANGED_TEAM_OF_ATTEND_member",
      "INITIALIZE_ATTEND_MEMBER"
    ]),
    autoTeamSplit() {
      let attend_member_id_list = [];
      for (let i in this.attendMember) {
        attend_member_id_list.push(Number(this.attendMember[i]["id"]));
      }

      let number_team = this.teamSplitSelected;
      let jocker_exist = this.isJoker;

      this.divide_member_into_team({
        attend_member_id_list: attend_member_id_list,
        number_team: this.teamCount,
        jocker_exist: jocker_exist
      });
      this.CHANGED_TEAM_OF_ATTEND_member(this.team_division);
    },
    setTeamCount(count) {
      this.teamCount = Number(count);
    },
    addTeamCount() {
      let length = this.attendTeamCount.length;
      if (length < 9) {
        this.attendTeamCount.push(length + 2);
      } else {
        this.setSnackBar({
          purpose: this.snackBarFail,
          message: "더 이상 팀 수를 늘릴 수 없습니다."
        });
      }
    },
    setJoker: function(isJoker) {
      if (isJoker) {
        this.teamJoker.push("J");
      } else {
        this.teamJoker = [];
      }
    },
    clickMember: function(value) {
      if (this.selectedTeam && !this.isJocker) {
        value.teamNumber = this.selectedTeam;
      } else {
        //조커가 클릭된 상태일 경우
        this.removeJocekr();
        value.teamNumber = 0;
      }
      value.color = this.colorIndex[value.teamNumber];
    },
    removeJocekr: function() {
      this.attendMember.map(item => {
        if (item.teamNumber === 0) {
          // teamNumber, color를 초기화
          item.teamNumber = null;
          item.color = "grey";
        }
      });
    },

    jockerIsBlack: function() {
      return this.isJocker;
    },

    clickTeam: function(value) {
      if (value !== "J") {
        this.selectedTeam = value;
        this.selectedJoker = false;
      } else {
        this.selectedTeam = null;
        this.isJoker = true;
        this.selectedJoker = true;
      }
    },
    async save() {
      this.FILL_TEAM_NUMBER();

      let payload = {
        team_split_index: this.teamSplitSelected,
        selected_schedule_id: this.scheduleList[this.scheduleIndex].id,
        team_split_data: this.attendMember
      };
      console.log(payload);
      await this.saveTeamSplit(payload);

      this.$router.push({
        name: "matchPrepare",
        params: {
          schedule_id: this.scheduleList[this.scheduleIndex].id,
          schedule_index: this.scheduleIndex,
          team_split_index: this.teamSplitSelected,
          quarter: 1
        }
      });
    }
  }
};
</script>

<style scoped>
.attandance__date {
  font-size: 20px;
  font-weight: 200;
}
.date__year {
  font-size: 20px;
  font-weight: 400;
}
.date__month {
  font-size: 24px;
  font-weight: 500;
}
.date__day {
  font-size: 20px;
  font-weight: 600;
  color: white;
}
.schdule__list {
  display: flex;
  flex-flow: column;
  flex-direction: column;
  background-color: bisque;
}

.date__item {
  background-color: pink;
  list-style: none;
}

.schedule__title {
  font-size: 16px;
  font-weight: 600;
}
.setting__actions {
  justify-content: space-between;
}

.tab__team {
  border: solid 5px;
}
.group__item {
  margin: 0 5px;
}
</style>
