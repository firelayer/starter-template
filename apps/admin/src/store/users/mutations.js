import config from '../../config'

export default {
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  LOADED: (state, items) => {
    state.items = items
    state.initialized = true
    state.isLoading = false
  },
  ON_USER_CREATED: (state, user) => {
    state.users.push(user)
  },
  SET_NEXT_PAGE_TOKEN: (state, nextPageToken) => {
    state.nextPageToken = nextPageToken
  },
  INCREMENT_PAGE: (state) => {
    state.page++
  },
  DECREMENT_PAGE: (state) => {
    state.page--
  },
  ON_FETCH: (state, { users, nextPageToken, lastPage }) => {
    state.users = state.users.concat(users)
    state.nextPageToken = nextPageToken
    state.lastPage = lastPage
  },
  SET_QUERY: (state, query) => {
    state.query = query
  },
  RESET: (state) => {
    state.items = []
    state.users = []
    state.page = 1
    state.nextPageToken = undefined
  }
}
