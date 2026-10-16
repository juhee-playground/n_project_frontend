<template>
  <v-app-bar app class="bar__contaniner">
    <v-app-bar-nav-icon @click.stop="onClickBtn" />
    <div class="bar__first-title" @onclick="movePage('home')">
      <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
    </div>
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
export default {
  data: () => ({
    title: "Nunnu Nanna",
    menu: "",
    userInfo: {
      id: 1,
      name: "juhee"
    }
  }),
  computed: {},
  methods: {
    onClickBtn() {
      console.log("click");
    },
    movePage(page) {
      console.log("move", page);
    },
    logout() {
      console.log("logout");
    }
  }
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/scss/components/core/toolbar.scss"
></style>
