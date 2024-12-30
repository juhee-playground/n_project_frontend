import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Join from "@/views/Join.vue";

Vue.use(VueRouter);

export const routesName = {
  login: "login",
  home: "home",
  join: "join",
};

const routes = [
  {
    path: "/",
    name: routesName.home,
    component: Home,
  },
  {
    path: "/home",
    name: routesName.home,
    component: Home,
  },
  {
    path: "/login",
    name: routesName.login,
    component: Login,
  },
  {
    path: "/join",
    name: routesName.join,
    component: Join,
  },
  {
    path: "*",
    name: "notFound",
    redirect: { name: "home" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VITE_BASE_URL,
  routes,
});

export default router;
