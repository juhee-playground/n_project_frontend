<template>
  <div>
    <v-row class="position__field" justify="center">
      <v-col
        v-for="item in positionList"
        :key="item"
        cols="4"
        class="text-center px-0 pb-0"
        align-self="center"
      >
        <v-btn v-if="item" @click="openDialog(item)">{{ item }}</v-btn>
        <v-text-field
          v-if="item"
          v-model="position[selectType][item]"
          class="position__name"
          clearable
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="position__bench" justify="center">
      <v-col
        v-for="item in benchList"
        :key="item"
        cols="4"
        class="text-center px-0 pb-0"
        align-self="center"
      >
        <v-btn v-if="item" @click="openDialog(item)">{{ item }}</v-btn>
        <v-text-field
          v-if="item"
          v-model="position[selectType][item]"
          class="position__name"
          clearable
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <dialog-squad-position
      v-if="dialog === true && type === 'position'"
      :select-team="selectTeam"
      :select-position="selectPosition"
      @savePosition="savePosition"
    ></dialog-squad-position>
  </div>
</template>

<script>
import dialog from "../../mixins/dialog.js";
import regex from "../../mixins/regex.js";
import Position from "@/assets/value/position.json";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  mixins: [dialog, regex],
  props: {
    members: {
      type: Object,
      defualt: null
    }
  },
  data: () => ({
    selectTeam: null,
    selectPosition: null,
    positionList: Position.list,
    benchList: Position.benchList,
    position: JSON.parse(JSON.stringify(Position.basicPostion))
  }),
  watch: {
    async members(value) {
      this.onMembersChange(value);
    }
  },
  computed: {
    ...mapState(["isHome", "selectType", "homeTeam", "awayTeam"])
  },
  methods: {
    openDialog(val) {
      this.selectPosition = val;
      if (this.isHome) {
        this.selectTeam = this.homeTeam;
      } else {
        this.selectTeam = this.awayTeam;
      }
      if (this.homeTeam && this.awayTeam) {
        this.setDialogAndType({ dialog: true, type: "position" });
      }
    },
    savePosition(member) {
      this.position[this.selectType][member.position] = member.name;
    },
    async onMembersChange(members) {
      this.position = JSON.parse(JSON.stringify(Position.basicPostion));

      members.forEach(member => {
        // member 형태
        //  selectType, position, name
        //    "Home",   "GK",     "김철"

        this.savePosition2(member, member.selectType);
      });
    },
    savePosition2(member, selectType) {
      this.position[member.selectType][member.position] = member.name;
    }
  }
};
</script>

<style>
.position__field {
  background: #a5d6a7;
}
.position__bench {
  background: #f1cd74;
}
.position__name {
  justify-content: center;
  margin: 0 auto;
  width: 108px;
}
</style>
