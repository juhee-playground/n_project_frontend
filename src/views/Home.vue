<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
        {{ userInfo }}
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <widget-basic :header-title="title" :is-loading="isLoading">
          <chart-bar-inverse
            class="chart"
            :data-set="chartData"
            :margin-left="40"
            :margin-top="0"
            :tick-count="5"
            :bar-padding="0.3"
          />
        </widget-basic>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { mapGetters } from "vuex";

const {
  mapState: attendMapState,
  mapActions: attendMapActions
} = createNamespacedHelpers("attend");
const {
  mapState: accountMapState,
  mapGetters: accountMapGetters
} = createNamespacedHelpers("account");

export default {
  data: () => ({
    chartData: [],
    title: "2020 출석횟수",
    isLoading: false
  }),
  computed: {
    ...accountMapGetters(["userInfo"])
  },
  created() {
    this.$store.commit("common/SET_FULL_SCREEN", false);
  },
  async mounted() {
    // 출석횟수 가져오기
    this.getAttendRate("2020");
  },
  methods: {
    ...attendMapActions(["countByYear"]),
    async getAttendRate(selectedYear) {
      this.isLoading = true;
      let yeardata = await this.countByYear();
      if (yeardata.lenth == 0) return;
      this.chartData = [];
      for (let i in yeardata) {
        let year = yeardata[i].year;
        if (year == selectedYear) {
          let name = yeardata[i].name;
          let count = Number(yeardata[i].count);
          this.chartData.push([name, count]);
        }
      }
      this.isLoading = false;
    }
  }
};
</script>

<style scoped></style>
