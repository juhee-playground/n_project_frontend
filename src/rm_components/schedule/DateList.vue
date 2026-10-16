<template>
  <v-container class="schedule__container">
    <v-row dense>
      <v-col cols="12" xs="12" class="date__content">
        <span>SELECTED DATE</span> -
        <span class="date__month pr-2">{{ setMonth }}</span>
        <span class="date__year">{{ setYear }}</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" class="schedule__list">
        <v-slide-group v-model="slide_index" show-arrows center-active>
          <v-slide-item
            v-for="(item, index) in scheduleList"
            :key="index"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              class="date__card ma-2"
              :class="{ active: active }"
              height="90"
              width="60"
              @click="toggle"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <div>
                    <v-badge
                      :color="scheduleColor[item.type]"
                      left
                      :content="item.game_count"
                    >
                      <p class="date__Mon my-2">
                        {{ item.date | setMomentMonth }}
                      </p>
                      <p class="date__day mb-0">{{ item.date.substr(8, 2) }}</p>
                      <v-chip
                        :color="
                          item.stadium_type === 'O' ? 'yellow darken-2' : ''
                        "
                        x-small
                      >
                        {{ item.stadium_type === "O" ? "실외" : "실내" }}
                      </v-chip>
                    </v-badge>
                  </div>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from "moment";
import scheduleValue from "@/assets/value/Schedule.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

export default {
  filters: {
    setMomentMonth: function(val) {
      return moment(val).format("MMM");
    }
  },
  props: {
    scheduleId: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    month: null,
    slide_index: null,
    setMonth: moment().format("MMMM"),
    setYear: moment().format("YYYY"),
    setDay: moment().format("DD"),
    scheduleColor: scheduleValue.colorAndType
  }),
  mounted() {},
  computed: {
    ...calendarMapState(["scheduleIndex", "scheduleList"]),
    slide_index: {
      get: function() {
        return this.scheduleIndex;
      },
      set: function(new_value) {
        this.SET_SCHEDULE_INDEX(new_value);
      }
    }
  },
  watch: {
    slide_index: async function(val) {
      if (val) {
        let selected_schedule = this.scheduleList[this.slide_index];
        this.setDateString(selected_schedule);
        this.SET_SCHEDULE_INDEX(val);
        this.$emit("changeDate", selected_schedule);
      }
    }
  },
  async created() {
    await this.select_schedule();
    // 선택이 안되어 있다면 가장 최신걸 선택
    if (this.scheduleIndex == null)
      this.SET_SCHEDULE_INDEX(this.scheduleList.length - 1);

    if (this.scheduleId)
      this.slide_index = this.SET_SCHEDULE_INDEX_WITH_SCHEDULE_ID(
        this.scheduleId
      );

    // 연동 필수
    this.slide_index = this.scheduleIndex;
  },
  methods: {
    ...calendarMapMutations([
      "SET_SCHEDULE_INDEX",
      "SET_SCHEDULE_INDEX_WITH_SCHEDULE_ID"
    ]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    setDateString(selected_schedule) {
      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");
    }
  }
};
</script>

<style
  lang="scss"
  src="@/assets/scss/components/schedule/dateList.scss"
></style>
