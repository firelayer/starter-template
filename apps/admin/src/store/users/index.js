import actions from './actions'
import mutations from './mutations'
import EditUserModule from './edit-user'

const state = {
  page: 1,
  lastPage: 1,
  nextPageToken: undefined,
  users: [], // total users
  items: [], // shown on table
  query: '',
  initialized: false,
  isLoading: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters: {
    hasMore: (state) => {
      const { page, lastPage, nextPageToken } = state

      return page !== lastPage || page === lastPage && !!nextPageToken
    }
  },
  modules: {
    'edit-user': EditUserModule
  }
}
