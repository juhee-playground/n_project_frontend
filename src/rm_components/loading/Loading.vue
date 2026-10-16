<template>
  <v-dialog v-model="loading" fullscreen>
    <div class="loading__box">
      <img
        class="loading__image"
        v-if="isBall"
        src="@/assets/images/animation/apng_loader-ball.png"
      />
      <v-progress-circular v-else indeterminate color="primary" />
    </div>
  </v-dialog>
</template>
<script>
export default {
  props: {
    isBall: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped src="@/assets/scss/components/loading.scss" />
