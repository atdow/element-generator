import Vue from 'vue'

const workPlace = {
  state: {
    sidebar: true,
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
    },
  },
  actions: {
    setSidebar({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type)
    }
  }
}

export default workPlace
