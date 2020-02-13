const getters = {
  loginFlag: state => state.user.loginFlag,
  searchFlag: state => state.search.searchFlag,
  searchParams: state => state.search.searchParams
}

export default getters
