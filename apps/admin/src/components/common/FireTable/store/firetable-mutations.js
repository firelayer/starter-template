export default () => ({
  SET_LOADING: (state, loading) => {
    state.isLoading = loading
  },
  LOADED: (state, items) => {
    state.items = items
    state.initialized = true
    state.isLoading = false
  },
  SET_SEARCH_PARAMS: (state, { query, queryInField, sortBy, sortDesc, disableSort }) => {
    state.query = query
    state.queryInField = queryInField
    state.sortBy = sortBy
    state.sortDesc = sortDesc
    state.disableSort = disableSort
  },
  ADD_PREVIOUS: (state, snap) => {
    state.prevStartAt.push(snap)
  },
  POP_PREVIOUS: (state) => {
    state.prevStartAt.pop()
  },
  INCREMENT_PAGE: (state) => {
    state.page++
  },
  DECREMENT_PAGE: (state) => {
    state.page--
  },
  RESET: (state) => {
    state.items = []
    state.page = 1
    state.hasMore = false
    state.prevStartAt = []
  },
  HAS_MORE: (state, hasMore) => {
    state.hasMore = hasMore
  }
})
