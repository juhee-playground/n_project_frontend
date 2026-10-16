<template></template>

<script>
import gameReportData from "@/assets/value/gameReport.json";

export default {
  props: {
    selectedYear: Number,
    selectedMonth: String
  },
  data: () => ({
    years: gameReportData.years,
    months: gameReportData.months
  })
};
</script>

<style></style>
