import api from '../../api'
import config from '../../config'
import { User } from '../../firebase'

const fetch = async function (nextPageToken) {
  const { data } = await api.get('/users', {
    params: {
      limit: config.pagination.users,
      nextPageToken
    }
  })

  return data
}

const searchUser = async ({ commit, dispatch, state }, query) => {
  if (query === '') return dispatch('getUsers', true)

  commit('SET_LOADING', true)
  commit('SET_QUERY', query)
  commit('RESET')

  const userSearch = new User(query)

  try {
    const user = await userSearch.get()

    commit('LOADED', [user])
  } catch (error) {
    commit('LOADED', [])
  }
}

const nextPage = async ({ commit, dispatch, state }) => {
  const { page, lastPage, nextPageToken, users } = state
  const pagination = config.pagination.users

  commit('SET_LOADING', true)

  const next = page + 1

  if (next <= lastPage) {
    const idx = page * pagination
    const items = users.slice(idx, idx + pagination)

    commit('INCREMENT_PAGE')
    commit('LOADED', items)

    return items
  }

  if (next > lastPage && nextPageToken) {
    try {
      const data = await fetch(nextPageToken)

      if (data.users.length === 0) {
        commit('SET_LOADING', false)
        commit('SET_NEXT_PAGE_TOKEN', null)
      } else {
        commit('INCREMENT_PAGE')
        commit('ON_FETCH', {
          users: data.users,
          nextPageToken: data.pageToken,
          lastPage: next
        })
        commit('LOADED', data.users)

        return data.users
      }

      return []
    } catch (error) {
      dispatch('app/showError', { error }, { root: true })
      commit('SET_LOADING', false)
    }
  }

  commit('SET_LOADING', false)

  return []
}

const prevPage =  async ({ commit, state }) => {
  const { page, users } = state
  const pagination = config.pagination.users

  commit('SET_LOADING', true)

  const prev = page - 1
  const idx = prev * pagination
  const items = users.slice(idx - pagination, idx)

  commit('DECREMENT_PAGE')
  commit('LOADED', items)

  return items
}

const getUsers = async ({ commit, dispatch, state }, refresh) => {
  if (refresh || state.users.length === 0) {
    commit('SET_LOADING', true)
    commit('SET_QUERY', '')
    commit('RESET')

    try {
      const data = await fetch()

      commit('ON_FETCH', {
        users: data.users,
        nextPageToken: data.pageToken,
        lastPage: 1
      })

      commit('LOADED', data.users)
    } catch (error) {
      dispatch('app/showError', { error }, { root: true })
    }

    commit('SET_LOADING', false)
  }
}

const createUser = async ({ commit, dispatch }, email) => {
  try {
    const user = new User()

    await user.create({ email })

    commit('ON_USER_CREATED', user.data)

    return user
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }

  return null
}

export default {
  getUsers,
  nextPage,
  prevPage,
  searchUser,
  createUser
}
