<template>
  <div class="text-center">
    <v-dialog v-if="(type = 'position')" v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          <v-toolbar flat>{{ selectPosition }} 선택</v-toolbar>
        </v-card-title>

        <v-card-text class="member__list">
          <v-btn
            v-for="member in selectTeam.members"
            :key="member.id"
            class="button__item"
            :class="{ active: member.id == isActive }"
            @click="clickMember(member)"
            >{{ member.name }}</v-btn
          >
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dialog from "../../../mixins/dialog.js";

export default {
  mixins: [dialog],
  props: {
    selectTeam: {
      type: Object,
      default: null
    },
    selectPosition: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    isActive: null
  }),
  created() {},
  methods: {
    clickMember(member) {
      this.isActive = member.id;
      member.position = this.selectPosition;
      this.$emit("savePosition", member);
    }
  }
};
</script>

<style>
.member__list {
  flex-wrap: row;
}
.button__item {
  margin: 5px;
}
.button__item.active {
  background-color: #34558b !important;
  color: white;
}
</style>
