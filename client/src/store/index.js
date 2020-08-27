import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    obj: {}
  },
  mutations: {
    setValue (state, newVal) {
      state.obj = newVal
    }
  },
  getters: {
    getNewValue (state) {
      return state.obj
    }
  },
  actions: {
    showNewValue (context, newVal) {
      context.commit('setValue', newVal)
    }
  },
  modules: {
  }
})
