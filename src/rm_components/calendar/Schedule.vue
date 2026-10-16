<template>
  <v-card class="calendar__schedule" color="grey lighten-4" flat>
    <v-toolbar color="grey lighten-4" flat tile height="40px">
      <v-spacer />
      <v-btn icon small class="mx-1" @click="openUpdateModal()">
        <v-icon small class="toolbar__icon">fas fa-edit</v-icon>
      </v-btn>
      <v-btn icon small class="mx-1" @click="deleteSchedule()">
        <v-icon small class="toolbar__icon">fas fa-trash-alt</v-icon>
      </v-btn>
      <v-btn icon small class="mx-1" @click="close()">
        <v-icon small>fas fa-times</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class="pa-4">
      <div class="item__container">
        <div class="row">
          <div class="col-2 align-self-center">
            <v-avatar size="20" :color="selectedSchedule.color" />
          </div>
          <div class="col-10 text-left">
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__title">
                  {{ selectedSchedule.name }}
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__start">
                  {{ selectedSchedule.start }}
                </span>
                ~
                <span class="schedule__end"> {{ selectedSchedule.end }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item__container">
        <div class="row">
          <div class="col-2 align-self-center">
            <v-icon>fas fa-map-marker-alt</v-icon>
          </div>
          <div class="col-10 text-left">
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__stadium_name">
                  {{ selectedSchedule.stadium_name }}
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__address">
                  {{ selectedSchedule.address }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item__container">
        <div class="row">
          <div class="col-2">
            <v-icon>fas fa-users</v-icon>
          </div>
          <div class="col-10 text-left">
            <div class="row">
              <div class="col-12 py-0">
                <span class="schedule__attend">
                  {{ `참석자 ${selectedSchedule.attendCount} 명` }}
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span
                  v-for="(item, idx) in selectedSchedule.member_name_list"
                  :key="idx"
                  class="attend__member"
                  >{{ item }},</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

export default {
  props: {
    selectedSchedule: {
      type: [String, Number],
      default: "" || 0
    }
  },
  methods: {
    ...calendarMapMutations(["SET_FULL_SCHEDULE_MODAL"]),
    ...calendarMapActions(["delete_schedule"]),
    openUpdateModal() {
      this.SET_FULL_SCHEDULE_MODAL(true);
    },
    deleteSchedule() {
      if (confirm("정말로 삭제하시겠습니까")) {
        this.delete_schedule({ schedule_id: this.selectedSchedule.id });
        this.close();
      }
    },
    close() {
      // 상위 컴포넌트의 calendar 에서 schedule close 함수 사용
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.calendar__schedule {
  width: 400px;
}
</style>
