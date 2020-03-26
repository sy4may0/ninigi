import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
},
  responseType: 'json',
});

export default new Vuex.Store({
  state: {
    apiUrl: process.env.VUE_APP_API_URL,
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
    ],

    events: [
      {
        name: "event0",
        start: "2020-01-02",
        color: "orange",
        obj: {
          _id: 1,
          date: "2020-01-02",
          unexpected: false,
          project: "STRINGS",
          category: "保守作業",
          description: "test",
          scheduled: "01:30",
          actual: "02:00",
          closed: true,
          issues: "testissues."
        },
      },
      {
        name: "event1",
        start: "2020-01-06",
        color: "orange",
        obj: {
          _id: 2,
          date: "2020-01-06",
          unexpected: false,
          project: "STRINGS",
          category: "保守作業",
          description: "test2",
          scheduled: "01:30",
          actual: "02:00",
          closed: true,
          issues: "testissues2."
        },
      },
      {
        name: "event2",
        start: "2020-01-07",
        color: "orange",
        obj: {
          _id: 2,
          date: "2020-01-07",
          unexpected: false,
          project: "STRINGS",
          category: "保守作業",
          description: "test3",
          scheduled: "01:30",
          actual: "02:00",
          closed: true,
          issues: "testissues3."
        },
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
    setTask (state, tasks) {
      state.tasks = tasks
    },
  },
  actions: {
    getTasks : async ( {commit} ) => {
      const response = await request.get('/task');
      const tasks = response.data;
      for(let task of tasks) {
        task.edit = false;
      }
      commit('setTask', tasks);
    },
    setUser : ({commit}, user) => {
      commit('setUser', user);
    }
  },
  modules: {
  }
})
