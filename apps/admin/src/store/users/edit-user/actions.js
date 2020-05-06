import { User } from '../../../firebase'

const getUser = async ({ commit, dispatch }, uid) => {
  commit('SET_LOADING', true)

  const user = new User(uid)

  try {
    await user.get()

    commit('SET_USER', user)
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }

  commit('SET_LOADING', false)
}

const saveUser = async ({ state, dispatch, rootState }, payload) => {
  const { users } = rootState.users
  const { user } = state

  try {
    const result = await user.save(payload)

    for (let i = 0, len = users.length; i < len; i++) {
      if (users[i].uid === user.uid) {
        users[i] = result
        break
      }
    }

    dispatch('app/showSuccess', 'User updated!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

const deleteUser = async ({ state, rootState, dispatch }) => {
  const { users } = rootState.users
  const { user } = state
  const { uid } = user

  await user.delete()

  try {
    for (let i = 0, len = users.length; i < len; i++) {
      if (users[i].uid === uid) {
        users.splice(i, 1)
        break
      }
    }

    // commit('users/SET_USERS', users, { root: true })
    dispatch('app/showSuccess', 'User deleted!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

const sendVerificationEmail = async ({ dispatch, state }) => {
  const { user } = state

  try {
    await user.sendVerificationEmail()

    dispatch('app/showToast', 'Verification email sent!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

const sendResetPasswordEmail = async ({ dispatch, state }) => {
  const { user } = state

  try {
    await user.sendResetPasswordEmail()

    dispatch('app/showToast', 'Reset password email sent!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

const exportUserData = async ({ dispatch }) => {
  try {
    dispatch('app/showToast', 'Not implemented!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

const setAdmin = async ({ dispatch, state }, admin) => {
  const { user } = state

  try {
    await user.setAdmin(admin)

    dispatch('app/showSuccess', 'User updated!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

const setDisabled = async ({ dispatch, state }, disabled) => {
  const { user } = state

  try {
    await user.setDisabled(disabled)

    dispatch('app/showSuccess', 'User updated!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

const revokeTokens = async ({ dispatch, state }) => {
  const { user } = state

  try {
    await user.revokeTokens()

    dispatch('app/showToast', 'User tokens have been revoked!', { root: true })
  } catch (error) {
    dispatch('app/showError', { error }, { root: true })
  }
}

export default {
  saveUser,
  getUser,
  deleteUser,
  sendResetPasswordEmail,
  sendVerificationEmail,
  exportUserData,
  setAdmin,
  setDisabled,
  revokeTokens
}
