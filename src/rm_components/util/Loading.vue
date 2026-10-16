<template>
  <div>
    <v-dialog v-model="loading" fullscreen>
      <v-container fluid fill-height class="loading">
        <v-layout justify-center align-center>
          <img src="@/assets/images/animation/apng_loader-ball.png" />
        </v-layout>
      </v-container>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    size: {
      type: Number,
      default: 600
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters("common", {
      loading: "loading"
    })
  }
};
</script>
<style lang="scss" scoped src="@/assets/scss/util/loading.scss" />
