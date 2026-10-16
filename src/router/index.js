import Vue from "vue";
import Router from "vue-router";
import { isAuthorization, logout } from "../mixins/auth";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Join from "../views/Join.vue";

import Member from "../views/footer/Member.vue";
import SquadView from "../views/footer/Squad.vue";
import GameReport from "../views/footer/GameReport.vue";
import GameReportDetail from "../views/footer/GameReportDetail.vue";
import LeagueReport from "../views/footer/LeagueReport.vue";
import Ranking from "../views/footer/Ranking.vue";
import Me from "../views/footer/MemberDetails.vue";

import TeamDetails from "../views/nav/team/Details.vue";
import UnitTeamDetails from "../views/nav/team/UnitDetails.vue";
import TeamAdd from "../views/nav/team/TeamAdd.vue";
import TeamAdmin from "../views/nav/team/TeamAdmin.vue";
import Profile from "../views/nav/member/Profile.vue";
import MemberAdd from "../views/nav/member/MemberAdd.vue";
import MemberAdmin from "../views/nav/member/MemberAdmin.vue";
import Attend from "../views/nav/Attend.vue";
import Calendar from "../views/nav/Schedule.vue";

import Squad from "../views/nav/squad/Squad.vue";
import MatchPrepare from "../views/nav/squad/MatchPrepare.vue";

import MatchInput from "../views/nav/match/MatchInput.vue";
import NotFound from "../views/NotFound.vue";

import Stadium from "../views/nav/stadium/Stadium.vue";
import StadiumAdd from "../views/nav/stadium/StadiumAdd.vue";
import StadiumUpdate from "../views/nav/stadium/StadiumUpdate.vue";

import Training from "../views/training/print.vue";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  if (isAuthorization()) {
    return next();
  } else {
    logout();
    // next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: requireAuth(),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/join",
    name: "join",
    component: Join,
  },
  // footer view
  {
    path: "/member",
    component: Member,
    beforeEnter: requireAuth(),
  },
  {
    path: "/gameReport",
    name: "gameReport",
    component: GameReport,
  },
  {
    path: "/gameReport/:schedule_id/details/:game_id",
    name: "gameDetails",
    component: GameReportDetail,
    props: true,
  },
  {
    path: "/leagueReport",
    name: "leagueReport",
    component: LeagueReport,
  },
  // {
  //   path: "/squadView",
  //   name: "squad",
  //   component: SquadView
  // },
  {
    path: "/member/details/:member_id",
    name: "memberDetails",
    component: Me,
    props: true,
  },
  {
    path: "/ranking",
    name: "ranking",
    component: Ranking,
  },
  // navigation view
  {
    path: "/team-admin",
    component: TeamAdmin,
  },
  {
    path: "/teamAdd",
    name: "teamAdd",
    component: TeamAdd,
  },
  {
    name: "teamDetails",
    path: "/team/:teamId",
    component: TeamDetails,
    props: true,
  },
  {
    name: "unitTeamDetails",
    path: "/unitTeam/:teamId",
    component: UnitTeamDetails,
    props: true,
  },
  {
    path: "/member-admin",
    component: MemberAdmin,
  },
  {
    path: "/attend",
    name: "attend",
    component: Attend,
  },
  {
    name: "memberUpdatePage",
    path: "/member/:memberId",
    component: Profile,
    props: true,
  },
  {
    path: "/memberAdd",
    name: "memberAdd",
    component: MemberAdd,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
  },
  {
    path: "/squad",
    name: "squadInput",
    component: Squad,
  },
  {
    path: "/matchPrepare/schedule/:schedule_id/quarter/:quarter",
    name: "matchPrepare",
    component: MatchPrepare,
    props: true,
  },
  {
    path: "/matchPrepare",
    name: "matchPrepareBasic",
    component: MatchPrepare,
  },
  {
    path: "/matchInput/schedule/:schedule_id/quarter/:quarter",
    name: "matchInput",
    component: MatchInput,
    props: true,
  },
  {
    path: "/stadium",
    name: "stadium",
    component: Stadium,
  },
  {
    path: "/StadiumAdd",
    name: "stadiumAdd",
    component: StadiumAdd,
  },
  {
    name: "stadiumUpdate",
    path: "/stadium/:stadiumId",
    component: StadiumUpdate,
    props: true,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/training",
    name: "training",
    component: Training,
  },
];

const router = new Router({
  mode: "history",
  base: "/",
  routes,
});
export default router;
