<template>
  <div v-show="show" class="widget__container">
    <div class="widget__container__header">
      <span class="header__title">{{ headerTitle }}</span>
    </div>
    <div v-show="!isLoading" class="widget__container__content">
      <slot></slot>
    </div>
    <div v-show="isLoading" class="widget__container__loader">
      <v-progress-circular
        indeterminate
        dark
        :color="loadingColor"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String,
      default: ""
    },
    loadingColor: {
      type: String,
      default: ""
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    show: true,
    loading: false
  })
};
</script>

<style lang="scss">
.widget__container {
  border-width: thin;
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;
  // box-shadow
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  // radius
  border-radius: 4px;
  &__header {
    padding: 8px;
    display: flex;
    justify-content: center;
    .header__title {
      padding: 8px;
      font-size: 1.2rem;
      font-weight: 700;
    }
    .widget__container__actions {
      padding: 8px;
    }
  }
  &__content {
    padding: 16px;
    font-size: 1rem;
  }
  &__loader {
    padding: 16px;
    text-align: center;
  }
}
</style>
