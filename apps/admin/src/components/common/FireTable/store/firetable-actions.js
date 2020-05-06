export default (limit, fetch) => {
  const nextPage = async ({ commit, dispatch, state }) => {
    commit('SET_LOADING', true)

    const { query, queryInField, sortBy, sortDesc } = state

    try {
      const items = await fetch({
        action: 'next',
        query,
        queryInField,
        sortBy,
        sortDesc,
        reference: state.items[state.items.length - 1]
      })

      if (items.length === 0) {
        commit('HAS_MORE', false)
        commit('SET_LOADING', false)
      } else {
        commit('INCREMENT_PAGE')
        commit('ADD_PREVIOUS', items[0].snap)
        commit('HAS_MORE', items.length === limit)
        commit('LOADED', items)
      }

      return items
    } catch (error) {
      dispatch('app/showError', { error }, { root: true })
      commit('SET_LOADING', false)
    }

    return []
  }

  const prevPage = async ({ commit, dispatch, state }) => {
    commit('SET_LOADING', true)

    const { query, queryInField, sortBy, sortDesc } = state

    try {
      const items = await fetch({
        action: 'prev',
        query,
        queryInField,
        sortBy,
        sortDesc,
        reference: state.items[state.items.length - 1],
        prevStartAt: state.prevStartAt[state.prevStartAt.length - 2]
      })

      commit('DECREMENT_PAGE')
      commit('POP_PREVIOUS')
      commit('HAS_MORE', true)
      commit('LOADED', items)

      return items
    } catch (error) {
      dispatch('app/showError', { error }, { root: true })
      commit('SET_LOADING', false)
    }

    return []
  }

  const search = async ({ commit, dispatch }, { query = '', queryInField = 'id', sortBy, sortDesc, disableSort } = {}) => {
    commit('RESET')
    commit('SET_LOADING', true)

    // store searched params
    commit('SET_SEARCH_PARAMS', {
      query,
      queryInField,
      sortBy,
      sortDesc,
      disableSort
    })

    try {
      const items = await fetch({ query, queryInField, sortBy, sortDesc })

      if (items.length > 0) {
        commit('ADD_PREVIOUS', items[0].snap)
      }
      commit('HAS_MORE', items.length === limit)
      commit('LOADED', items)

      return items
    } catch (error) {
      dispatch('app/showError', { error }, { root: true })
      commit('SET_LOADING', false)
    }

    return []
  }

  return {
    search,
    nextPage,
    prevPage
  }
}
