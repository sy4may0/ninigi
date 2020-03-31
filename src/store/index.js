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
    user: undefined,

    initTask: {
    },
    initAchievement: {
      unexpected: false,
      closed: false,
      description: "",
      scheduled: "00:00",
      actual: "00:00",
      issues: "", 
      dates: [],
    },
    tasks: [
    ],

    events: [],

    // [TODO] mutation and dispatch
    users: [
      { text: "唐澤貴洋", value: "k_takahiro" },
      { text: "長谷川亮太", value: "r_hasegawa" },
    ],

    projects: [
      "INITS",
      "MINITS",
      "GOSAT系",
      "デブリ",
    ],

    categories: [
      "要望事項対応",
      "衣装対応(ソフト)",
      "衣装対応(ハード)",
      "提案活動(商談)",
      "構築(設計・構築・試験含む)",
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
      state.tasks = tasks;
    },
    setEvent (state, achievements) {
      state.events = [];
      for (let achievement of achievements) {
        state.events.push({
            name: achievement.project,
            start: achievement.date,
            color: "orange",
            obj: achievement,
        });
      }
    },
  },
  actions: {
    getTasks : async ( {state, commit} ) => {
      const response = await request.get('/task', {
        params: {
          user: state.user 
        }
      });
      const tasks = response.data;
      for(let task of tasks) {
        task.edit = false;
      }
      commit('setTask', tasks);
    },
    getEvents : async ( {state, commit} ) => {
      const response = await request.get('/achievement', {
        params: {
          user: state.user 
        }
      });
      const achievements = response.data;
      commit('setEvent', achievements);
    },
    setUser : async ({commit}, user) => {
      commit('setUser', user);
    }
  },
  modules: {
  }
})
