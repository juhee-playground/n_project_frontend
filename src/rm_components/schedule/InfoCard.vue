<template>
  <v-card clsss="schedule__card" shaped :loading="cardInfoLoading">
    <v-card-title class="schedule__title">{{ scheduleName }}</v-card-title>
    <v-card-text>
      <div class="schedule__time my-3 subtitle-1">
        {{ scheduleStart }} - {{ scheduleEnd }}
      </div>
    </v-card-text>

    <v-divider class="mx-2"></v-divider>
    <v-card-text class="schedule__stadium">{{ scheduleStadium }}</v-card-text>
    <v-card-text class="schedule__address grey--text">{{
      scheduleAddress
    }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    cardInfoLoading: {
      type: Boolean,
      default: false
    },
    scheduleName: {
      type: String,
      default: null
    },
    scheduleStart: {
      type: String,
      default: null
    },
    scheduleEnd: {
      type: String,
      default: null
    },
    scheduleStadium: {
      type: String,
      default: null
    },
    scheduleAddress: {
      type: String,
      default: null
    }
  },
  data: () => ({})
};
</script>

<style lang="scss">
.schedule__card {
  font-size: 18px;
  color: #666;

  .schedule__title {
    font-size: 24px;
    font-weight: 600;
    color: black;
  }
  .schedule__time {
    font-size: 20px;
  }
  .schedule__stadium {
    color: black;
  }
}
</style>
