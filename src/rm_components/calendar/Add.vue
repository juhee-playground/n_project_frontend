<template>
  <div v-if="createNewSchedule">
    <v-menu
      v-model="newScheduleBox"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      offset-y
      offset-overflow
    >
      <template v-slot:activator="{ on }">
        <div
          v-ripple
          class="schedule__new muji"
          v-on="on"
          @click.stop="close()"
        >
          {{ new_schedule_title }}
        </div>
      </template>

      <v-card color="grey lighten-4" :slot-data="slotData">
        <v-form ref="form" class="form" lazy-validation>
          <v-toolbar
            class="popover__header"
            height="40"
            color="grey lighten-4"
            flat
            tile
          >
            <v-spacer />
            <v-btn icon small class="mx-1" @click="close()">
              <v-icon small>fas fa-times</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="pa-3 pt-0">
            <v-row dense>
              <v-col cols="2"></v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="schedule_name"
                  dense
                  height="40"
                  label="TITLE"
                  placeholder="제목 및 시간 추가"
                  :rules="emptyCheckRules"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" align-self="start">
                <v-avatar size="25" :color="color" />
              </v-col>
              <v-col cols="9" align-self="start">
                <v-select
                  v-model="schedule_type"
                  dense
                  label="TYPE"
                  item-text="name"
                  item-value="type"
                  :items="types"
                  :rules="emptyCheckRules"
                  @change="changeType()"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" align-self="center">
                <v-icon>fas fa-calendar-alt</v-icon>
              </v-col>
              <v-col cols="9" align-self="center">
                <v-menu
                  ref="menu_date"
                  v-model="menu_date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="selectedDate"
                      dense
                      disabled
                      readonly
                      :placeholder="selectedDate"
                      :rules="emptyCheckRules"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    dense
                    no-title
                    @input="menu_date = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" align-self="center">
                <v-icon>fas fa-clock</v-icon>
              </v-col>
              <v-col cols="4" align-self="center">
                <v-menu
                  ref="menu_start"
                  v-model="menu_start"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="start_time"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="start_time"
                      label="START TIME"
                      readonly
                      :rules="emptyCheckRules"
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-if="menu_start"
                    v-model="start_time"
                    full-width
                    @click:minute="$refs.menu_start.save(start_time)"
                  />
                </v-menu>
              </v-col>
              <b class="align-self-center">-</b>
              <v-col cols="4" align-self="center">
                <v-menu
                  ref="menu"
                  v-model="menu_end"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="end_time"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="end_time"
                      label="END TIME"
                      readonly
                      :rules="emptyCheckRules"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu_end"
                    v-model="end_time"
                    format="24hr"
                    :min="start_time"
                    full-width
                    @click:minute="$refs.menu.save(end_time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" align-self="center">
                <v-icon>fas fa-map-marker-alt</v-icon>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="stadium_id"
                  dense
                  label="STADIUM"
                  item-value="id"
                  item-text="name"
                  :items="stadiumList"
                  :rules="emptyCheckRules"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" class="text-right">
                <v-btn color="primary" @click="submit">저장</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import stringSchedules from "../../assets/value/Schedule";
import regex from "../../mixins/regex.js";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutaions,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");
const { mapMutations: commonMapMutations } = createNamespacedHelpers("common");

import moment from "moment";
export default {
  mixins: [regex],
  props: {
    selectedDate: {
      type: String,
      default: ""
    },
    day: {
      type: String,
      default: ""
    },
    newScheduleBox: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    popover_menu: false,
    color: "rgb(230, 124, 115)",
    menu_date: false,
    menu_start: false,
    menu_end: false,

    start_time: null,
    end_time: null,
    schedule_name: "",
    schedule_type: "",
    stadium_type: "",
    new_schedule_title: "(제목없음)",
    types: stringSchedules.typeList
  }),
  computed: {
    ...calendarMapState(["newScheduleBox"]),
    ...stadiuMapState(["stadiumList"]),
    createNewSchedule() {
      return this.newScheduleBox && this.day === this.selectedDate;
    },
    slotData() {
      return {
        close: this.close
      };
    }
  },
  watch: {
    newScheduleBox(val) {
      this.initDialog();
    }
  },
  created() {
    this.date = this._clickDate;
  },

  mounted() {
    this.select_stadium();
  },
  methods: {
    ...stadiumMapActions(["select_stadium"]),
    ...calendarMapActions(["add_schedule", "select_schedule"]),
    ...calendarMapMutaions(["SET_NEW_SCHEDULE_MODAL"]),
    ...commonMapMutations(["SET_ALERT"]),
    changeType() {
      this.color = stringSchedules.types[this.schedule_type].color;
    },
    close() {
      this.initDialog();
      this.SET_NEW_SCHEDULE_MODAL(!this.newScheduleBox);
    },
    initDialog() {
      this.schedule_name = "";
      this.start_time = null;
      this.end_time = null;
      this.schedule_type = "";
      this.stadium_type = "";
    },
    submit() {
      if (this.$refs.form.validate()) {
        let _srcData = {};

        _srcData["name"] = this.schedule_name;
        _srcData["stadium_id"] = this.stadium_id;
        _srcData["type"] = this.schedule_type;
        _srcData["date"] = this.selectedDate;
        _srcData["start_time"] = this.start_time;
        _srcData["end_time"] = this.end_time;

        this.add_schedule(_srcData).then(() => {
          this.SET_ALERT(true);
          this.close();
          this.select_schedule();
        });
      }
    }
  }
};
</script>

<style scoped>
.popover__header {
  padding-top: 20px;
}
.schedule__new {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  color: #fff;
  height: 20px;
  width: 95%;
  margin-bottom: 1px;
  font-size: 11px;
  padding: 3px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
