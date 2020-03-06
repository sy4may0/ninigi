import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: "",

    initTask: {
    },
    initAchievement: {
      uexpected: false,
      description: "",
      scheduled: "00:00",
      actual: "00:00",
      issues: "", 
      dates: [],
    },
    tasks: [
      {
        _id: 0,
        title: "SSA構築作業　単体試験",
        project: "SSA",
        category: "構築作業(設計/提案)",
        description: "SSA単体試験",
        edit: false,
      },
      {
        _id: 1,
        title: "BEACHネットワーク換装　ラック搭載支援作業",
        project: "BEACH",
        category: "構築作業",
        edit: false,
      },
      {
        _id: 2,
        title: "STRINGS 保守報告書作成",
        project: "STRINGS",
        category: "保守作業",
        edit: false,
      },
    ],

    events: [
      {
        name: "event0",
        start: "2020-01-02",
        color: "orange",
        obj: "test",
      },
      {
        name: "event1",
        start: "2020-01-06",
        color: "orange",
        obj: "test",
      },
      {
        name: "event2",
        start: "2020-01-07",
        color: "orange",
        obj: "test",
      },
    ],

    // [TODO] mutation and dispatch
    users: [
      { text: "唐澤貴洋", value: "k_takahiro" },
      { text: "長谷川亮太", value: "r_hasegawa" },
    ],

    projects: [
      "INITS",
      "MINITS",
      "GOSAT",
      "GOSAT-2",
      "SSA",
    ],

    categories: [
      "要望対応",
      "月次作業",
      "構築作業(設計/提案)",
      "雑務",
    ],

    color: {
      main: 'white',
      sub: 'orange',
      accent: 'purple'
    },


  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser : ({commit}, user) => {
      commit('setUser', user);
    }
  },
  modules: {
  }
})
