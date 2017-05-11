import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authentication: {
      isAuthenticated: false,
      user: {}
    }
  },
  mutations: {
    setAuthState (state, authState) {
      state.authentication.isAuthenticated = authState
    },
    setUser (state, user) {
      state.authentication.user = user
    }
  }
})
