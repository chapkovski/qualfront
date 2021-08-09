import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routeqs: {},
  },
  mutations: {
    SET_ROUTEQS: (state, obj) => {
      state.routeqs = obj;
    },
  },
  actions: {},
  modules: {}
})
