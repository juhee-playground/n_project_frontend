<template>
  <v-card outlined class="pa-3">
    <v-row wrap justify="center">
      <v-col cols="1" align-self="center">
        <v-img src="@/assets/images/sun.png" contain width="30" height="30" />
      </v-col>
      <v-col cols="11">
        <div class="text-left">
          <v-chip
            v-for="(member, index) in good_attend"
            :key="index"
            dark
            label
            :outlined="member.attend ? 'outlined' : ''"
            :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
            :color="member.attend ? 'tertiary' : 'muji'"
            @click="clickMember(member)"
            >{{ member.name }}</v-chip
          >
        </div>
      </v-col>
    </v-row>
    <v-row wrap justify="center">
      <v-col cols="1" align-self="center">
        <v-img src="@/assets/images/rainy.png" contain width="30" height="30" />
      </v-col>
      <v-col cols="11">
        <div class="text-left">
          <v-chip
            v-for="(member, index) in so_so_attend"
            :key="index"
            dark
            label
            :outlined="member.attend ? 'outlined' : ''"
            :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
            :color="member.attend ? 'tertiary' : 'muji'"
            @click="clickMember(member)"
            >{{ member.name }}</v-chip
          >
        </div>
      </v-col>
    </v-row>
    <v-row wrap justify="center">
      <v-col cols="1" align-self="center">
        <v-img src="@/assets/images/ghost.png" contain width="30" height="30" />
      </v-col>
      <v-col cols="11">
        <div class="text-left">
          <v-chip
            v-for="(member, index) in ghost_attend"
            :key="index"
            dark
            label
            :outlined="member.attend ? 'outlined' : ''"
            :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
            :color="member.attend ? 'tertiary' : 'muji'"
            @click="clickMember(member)"
            >{{ member.name }}</v-chip
          >
        </div>
      </v-col>
    </v-row>
    <v-row wrap justify="center">
      <v-col cols="1" align-self="center">
        <v-img
          src="@/assets/images/cemetery.png"
          contain
          width="30"
          height="30"
        />
      </v-col>
      <v-col cols="11">
        <div class="text-left">
          <v-chip
            v-for="(member, index) in outsider_attend"
            :key="index"
            dark
            label
            :outlined="member.attend ? 'outlined' : ''"
            :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
            :color="member.attend ? 'tertiary' : 'muji'"
            @click="clickMember(member)"
            >{{ member.name }}</v-chip
          >
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState: attendMapState } = createNamespacedHelpers("attend");

export default {
  computed: {
    ...attendMapState([
      "good_attend",
      "so_so_attend",
      "ghost_attend",
      "outsider_attend"
    ])
  },
  methods: {
    clickMember(member) {
      this.$emit("isAttend", member);
    }
  }
};
</script>

<style></style>
