export default {
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  UPDATE_USER: (state, user) => {
    state.user = {
      ...state.user,
      ...user
    }
  },
  RESET_USER: (state) => {
    state.user = {}
    state.isLoading = false
  }
}
