const state = {
  loginFlag: false,
  likeDissArr: {}
}
const mutations = {
  TO_LOGIN: (state, value) => {
    state.loginFlag = value
  },
  CHANGE_LIKEDISS_ARR: (state, vale) => {
    state.likeDissArr = value
  }
}
const actions = {
  toLogin({ commit }, value) {
    commit('TO_LOGIN', value)
  },
  changeLikeDissArr({commit}, value) {
    commit('CHANGE_LIKEDISS_ARR', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
