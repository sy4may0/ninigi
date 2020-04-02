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

const init_gte = new Date();
const init_lte = new Date();
init_gte.setDate(1);
init_gte.setMonth(init_gte.getMonth() - 1)
init_lte.setDate(1);
init_lte.setMonth(init_lte.getMonth() + 2)

export default new Vuex.Store({
  state: {
    apiUrl: process.env.VUE_APP_API_URL,
    user: undefined,

    period: {
      gte: init_gte,
      lte: init_lte
    },

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
    ],

    projects: [
    ],

    categories: [
    ],

    color: {
      main: 'white',
      sub: 'orange',
      accent: 'purple'
    },

  },
  mutations: {
    setProjects (state, projects) {
      state.projects = projects;
    },
    setCategories (state, categories) {
      state.categories = categories;
    },
    setUsers (state, users) {
      state.users = users;
    },
 
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
    incrPeriod(state) {
      state.period.gte.setMonth(state.period.gte.getMonth() + 1)
      state.period.lte.setMonth(state.period.lte.getMonth() + 1)
    },
    decrPeriod(state) {
      state.period.gte.setMonth(state.period.gte.getMonth() - 1)
      state.period.lte.setMonth(state.period.lte.getMonth() - 1)
    },
    initPeriod(state) {
      state.period.gte = new Date();
      state.period.lte = new Date();
      state.period.gte.setDate(1);
      state.period.gte.setMonth(state.period.gte.getMonth() - 1)
      state.period.lte.setDate(1);
      state.period.lte.setMonth(state.period.lte.getMonth() + 2)
    }
 
  },
  actions: {
    getConfig : async ( {commit} ) => {
      const response = await request.get('/conf')
      const data = response.data;
      commit('setUsers', data.users);
      commit('setProjects', data.projects);
      commit('setCategories', data.categories);
    },
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
          user: state.user, 
          gte: state.period.gte,
          lte: state.period.lte
        }
      });
      const achievements = response.data;
      commit('setEvent', achievements);
    },
    setUser : async ({commit}, user) => {
      commit('setUser', user);
    },

    incrPeriod: ({commit}) => {
      commit('incrPeriod');
    },
    decrPeriod: ({commit}) => {
      commit('decrPeriod');
    },
    initPeriod: ({commit}) => {
      commit('initPeriod');
    }
  },
  modules: {
  }
})
