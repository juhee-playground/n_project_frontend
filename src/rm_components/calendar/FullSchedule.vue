<template>
  <v-dialog
    v-model="fullScheduleDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <form>
        <v-row>
          <v-col cols="8" class="schedule__title">
            <v-toolbar class="pa-2" flat light>
              <v-btn icon @click="close()">
                <v-icon>fas fa-times</v-icon>
              </v-btn>
              <v-text-field
                ref="title"
                v-model="title"
                dense
                hide-details
                height="48"
                placeholder="제목 및 시간 추가"
              />
              <v-btn color="primary" dark class="ma-2" @click="save()"
                >Save</v-btn
              >
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-col>
        </v-row>
        <v-card-text>
          <v-row dense>
            <v-col cols="2" class="schedule__date">
              <v-menu
                v-model="menu_date"
                transition="scale-transition"
                :close-on-content-click="false"
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="menu_date"
                    v-model="date"
                    solo
                    dense
                    readonly
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="date" dense no-title />
              </v-menu>
            </v-col>
            <v-col cols="1" class="schedule__time">
              <v-menu
                ref="menu_start"
                v-model="menu_start"
                :nudge-right="40"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="240px"
                min-width="240px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="start_time"
                    v-model="start_time"
                    dense
                    solo
                    color="grey"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="menu_start"
                  ref="startTimePicker"
                  v-model="start_time"
                  format="24hr"
                  full-width
                  @click:minute="$refs.menu_start.save(start_time)"
                  @change="changeStartTime"
                />
              </v-menu>
            </v-col>
            <v-col cols="1">
              <v-menu
                ref="menu_end"
                v-model="menu_end"
                :nudge-right="40"
                :close-on-content-click="false"
                transition="scale-transition"
                max-width="240px"
                min-width="240px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="end_time"
                    v-model="end_time"
                    dense
                    solo
                    color="grey"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  ref="endTimePicker"
                  v-model="end_time"
                  format="24hr"
                  :min="start_time"
                  full-width
                  @click:minute="$refs.menu_end.save(end_time)"
                  @change="changeEndTime"
                />
              </v-menu>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6">
              <div class="d-flex schedule__stadium">
                <span class="schedule__icon align-self-center">
                  <v-icon>fas fa-map-marker-alt</v-icon>
                </span>
                <v-select
                  ref="stadium"
                  v-model="stadium"
                  class="px-2"
                  dense
                  solo
                  hide-details
                  :items="stadiumList"
                  label="경기장 선택"
                  item-value="id"
                  item-text="name"
                  @change="setAddress"
                ></v-select>
              </div>
              <div class="schedule__address py-3">
                <v-text-field
                  v-model="address"
                  dense
                  hide-details
                  filled
                  readonly
                />
              </div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="3" class="d-flex">
              <span class="schedule__icon align-self-center">
                <v-icon :style="`color: ${color}`">fas fa-circle</v-icon>
              </span>
              <v-select
                ref="type"
                v-model="type"
                class="px-1"
                dense
                solo
                hide-details
                :items="typeList"
                label="Select a type"
                item-value="type"
                item-text="name"
                @change="setColor"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <div style="flex: 1 1 auto;"></div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import stringSchedules from "../../assets/value/Schedule.json";

import { createNamespacedHelpers } from "vuex";
import moment from "moment";
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: stadiumMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");

export default {
  props: {
    scheduleId: {
      type: [String, Number],
      default: "" || 0
    }
  },
  data: () => ({
    menu_date: false,
    menu_start: false,
    menu_end: false,
    name_type: "",
    name_place: "",
    name_start_time: "",
    name_end_time: "",
    title: "",
    date: null,
    start_time: null,
    end_time: null,
    stadium: null,
    address: "",
    type: null,
    color: null,
    typeList: stringSchedules.typeList
  }),
  computed: {
    ...calendarMapState(["fullScheduleDialog", "scheduleInfo"]),
    ...stadiumMapState(["stadiumList"])
  },
  watch: {},
  async created() {
    await this.getStadiumList();
    await this.getScheduleInfo(this.scheduleId);
  },
  methods: {
    ...calendarMapMutations(["SET_FULL_SCHEDULE_MODAL"]),
    ...calendarMapActions(["update_schedule", "get_schedule_info"]),
    ...stadiumMapActions(["select_stadium"]),
    changeStartTime: function(time) {
      this.$refs.menu_start.save(time);
      this.title = `[${this.name_type}] ${this.name_place} ${this.start_time} ~ ${this.end_time}`;
    },
    changeEndTime: function(time) {
      this.$refs.menu_end.save(time);
      this.title = `[${this.name_type}] ${this.name_place} ${this.start_time} ~ ${this.end_time}`;
    },
    close() {
      this.SET_FULL_SCHEDULE_MODAL(!this.fullScheduleDialog);
      this.getScheduleInfo(this.scheduleId); // 수정 내용 초기화
      this.$emit("closeEvent");
    },
    getScheduleInfo: async function(id) {
      this.scheduleInfo = await this.get_schedule_info(id);
      await this.setScheduleInfo(this.scheduleInfo);
    },
    getStadiumList: async function() {
      await this.select_stadium();
    },
    save() {
      // value 포맷 맞추기 날짜, 없을 때
      var date = this.$refs.menu_date.value;
      var start_time = this.$refs.start_time.value;
      var end_time = this.$refs.end_time.value;
      var stadium_id = this.$refs.stadium.value;
      var name = this.$refs.title.value;
      var type = this.$refs.type.value;

      var scheduleFormData = {
        date: date,
        start_time,
        end_time: end_time,
        stadium_id: stadium_id,
        name: name,
        type: type
      };

      this.update_schedule({
        schedule_id: this.scheduleId,
        schedule: scheduleFormData
      });

      this.close();
    },
    setAddress(value) {
      this.name_place = this.stadiumList[value - 1].name;
      this.stadiumList.forEach(item => {
        if (item.id === value) {
          this.address = item.address;
        }
      });
      this.title = `[${this.name_type}] ${this.name_place} ${this.start_time} ~ ${this.end_time}`;
    },
    setColor(type) {
      if (type === "T") {
        this.color = "rgb(142, 36, 170)";
        this.name_type = "훈련";
      } else if (type === "P") {
        this.color = "rgb(51, 182, 121)";
        this.name_type = "자체 경기";
      } else if (type === "L") {
        this.color = "rgb(246, 191, 38)";
        this.name_type = "리그";
      } else if (type === "M") {
        this.color = "rgb(121, 134, 203)";
        this.name_type = "친선경기";
      } else if (type === "C") {
        this.color = "rgb(230, 124, 115)";
        this.name_type = "대회";
      } else if (type === "S") {
        this.color = "rgb(0, 0, 0)";
        this.name_type = "테스트";
      }
      this.title = `[${this.name_type}] ${this.name_place} ${this.start_time} ~ ${this.end_time}`;
    },
    setScheduleInfo(info) {
      this.date = info.date;
      this.start_time = info.start_time;
      this.end_time = info.end_time;
      this.stadium = info.stadium_id;
      this.name_place = info.nick_name;
      this.address = info.address;
      this.type = info.type;
      this.setColor(this.type);
    }
  }
};
</script>

<style>
.schedule__title {
  font-size: 24px;
  line-height: 28px;
}

.schedule__date {
  margin-left: 45px;
}

.schedule__icon {
  margin: 0 10px;
}

.schedule__address {
  margin-left: 45px;
  width: 90%;
  text-overflow: ellipsis;
}
</style>
