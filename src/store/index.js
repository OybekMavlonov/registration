import Vue from 'vue'
import Vuex from 'vuex' 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    user(state, userData) {
      state.user = userData
    }
  },
  actions: {
    user ({commit}, userData) {
      commit('user', userData);
    }
  },
  modules: {
  }
})
