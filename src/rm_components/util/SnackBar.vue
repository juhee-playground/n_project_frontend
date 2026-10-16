<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-if="purpose === 'showSuccess' || purpose === 'showFail'"
      v-model="snackBar"
      :color="setColor()"
      multi-line
      :timeout="timeout"
    >
      <span class="subtitle">{{ message }}</span>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "완료되었습니다"
    },
    purpose: {
      type: String,
      default: "showSuccess"
    },
    timeout: {
      type: Number,
      default: 2000
    }
  },
  data: () => ({}),
  computed: {
    snackBar: {
      get() {
        return this.$store.state["common"].snackBar;
      },
      set(value) {
        return this.$store.commit("common/SET_SNACK_BAR", value);
      }
    }
  },
  created() {},
  methods: {
    setColor: function() {
      if (this.purpose === "showSuccess") {
        return "grey darken-4";
      } else if (this.purpose === "showFail") {
        return "red lighten-1";
      }
    }
  }
};
</script>

<style scoped></style>
