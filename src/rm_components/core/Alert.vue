<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="alert" :timeout="timeout">
      {{ message }}
      <v-btn color="pink" text @click="closeSnackBar">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: commonMapState,
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");
export default {
  data: () => ({
    timeout: 5000,
    message: "수정되었습니다."
  }),
  computed: {
    ...commonMapState(["alert"])
  },
  methods: {
    ...commonMapMutations(["SET_ALERT"]),
    closeSnackBar() {
      this.SET_ALERT(false);
    }
  }
};
</script>

<style scoped></style>
