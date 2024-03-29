import * as constants from "../constants";
import {
  createMember,
  getReqularMember,
  getAllMember,
  deleteMember,
  updateMember,
  detailsMember
} from "../../api/member.js";

const state = {
  memberList: [],
  profile: {},
  memberId: "",
  res: ""
};

const getters = {};
const mutations = {
  [constants.SELECT_MEMBER](state, memberList) {
    state.memberList = memberList;
  },
  SELECT_ALL_MEMBER(state, memberList) {
    state.memberList = memberList;
  },
  [constants.DELETE_MEMBER](state, memberId) {},
  [constants.DETAILS_MEMBER](state, memberProfile) {
    state.profile = memberProfile;
  },
  [constants.UPDATE_MEMBER](state, memberProfile) {
    state.res = memberProfile;
  }
};

const actions = {
  async add_member(context, form) {
    try {
      const response = await createMember(form);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async select_member({ commit }) {
    try {
      const response = await getReqularMember();
      commit("SELECT_MEMBER", response.data);
      return response;
    } catch (e) {
      console.log("error", e);
    }
  },

  async select_all_member({ commit }) {
    try {
      const response = await getAllMember();
      commit("SELECT_ALL_MEMBER", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },

  async delete_member({ commit }, payload) {
    try {
      const response = await deleteMember(payload);
      commit("DELETE_MEMBER", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },

  async details_member({ commit }, payload) {
    try {
      const response = await detailsMember(payload);
      commit("DETAILS_MEMBER", response.data);
      return response;
    } catch (e) {
      console.log(e);
    }
  },

  async update_member({ commit }, payload) {
    try {
      const response = await updateMember(payload);
      commit("UPDATE_MEMBER", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
