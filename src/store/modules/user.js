const state = {
  loginFlag: false
}
const mutations = {
  TO_LOGIN: (state, value) => {
    state.loginFlag = value
  }
}
const actions = {
  toLogin({ commit }, value) {
    commit('TO_LOGIN', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
