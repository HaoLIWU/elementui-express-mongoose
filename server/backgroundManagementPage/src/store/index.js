import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

  export default new Vuex.Store({
  state: {
    selectKey: '1-1'
  },
  mutations: {
    setKey (state, newVal) {
      state.selectKey = newVal
    }
  },
  actions: {
  },
  modules: {
  }
})
