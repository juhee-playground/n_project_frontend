<template>
  <v-app-bar app class="bar__contaniner">
    <v-app-bar-nav-icon @click.stop="onClickBtn" />
    <router-link to="/" class="bar__first-title">
      <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <div class="bar__second-profile">
      <v-menu
        v-model="menu"
        class="profile__menu"
        :close-on-content-click="false"
        :nudge-width="120"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <span class="profile__text">{{ userInfo.name }} 님</span>
            <v-avatar class="mx-3" color="grey">
              <img src="@/assets/images/photo-default.png" alt="John" />
            </v-avatar>
          </div>
        </template>
        <v-card class="profile__dropdown">
          <div class="avatar__box-info">
            <span class="text__bold-main">{{ userInfo.id }}</span>
            <v-btn
              class="button__item"
              outlined
              color="primary"
              small
              @click="movePage('my-profile')"
              >내 정보</v-btn
            >
          </div>
          <v-divider class="avatar__box-divider" />
          <v-card-actions class="avatar__box-logout" @click="logout">
            <span>로그아웃</span>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations: commonMapMutations } = createNamespacedHelpers("common");
const { mapGetters: accountMapGetters } = createNamespacedHelpers("account");

import { logout } from "../../mixins/auth.js";

export default {
  name: "Toolbar",
  data: () => ({
    title: "Nunnu Nanna",
    menu: ""
  }),
  computed: {
    ...accountMapGetters(["userInfo"])
  },
  watch: {},
  methods: {
    ...commonMapMutations(["SET_DRAWER"]),
    onClickBtn() {
      this.SET_DRAWER(!this.$store.state.common.drawer);
    },
    movePage(page) {
      console.log("move", page);
    },
    logout() {
      console.log("logout");
      logout();
    }
  }
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/scss/components/core/toolbar.scss"
></style>
