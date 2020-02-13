const state = {
  searchFlag: false,
  searchParams: {}
}
const mutations = {
  CHANGE_SEARCH_FLAG: (state, flag) => {
    state.searchFlag = flag
  },
  CHANGE_SEARCH_PARAMS: (state, params) => {
    state.searchParams = params
  }
}
const actions = {
  // 把searchFlag置为true
  searchStart({commit}) {
    commit('CHANGE_SEARCH_FLAG', true)
  },
  // 修改搜索的参数
  changeSearchParams({commit}, value) {
    commit('CHANGE_SEARCH_PARAMS', value)
  },
  // 搜索完成
  searchDone({commit}) {
    commit('CHANGE_SEARCH_FLAG', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
