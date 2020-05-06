const showToast = ({ state, commit }, message) => {
  if (state.toast.show) commit('HIDE_TOAST')

  setTimeout(() => {
    commit('SHOW_TOAST', {
      color: 'black',
      message,
      timeout: 3000
    })
  })
}

const showError = ({ state, commit }, { message = 'Failed!', error }) => {
  if (state.toast.show) commit('HIDE_TOAST')

  setTimeout(() => {
    commit('SHOW_TOAST', {
      color: 'error',
      message: message + ' ' + error.message,
      timeout: 10000
    })
  })
}

const showSuccess = ({ state, commit }, message) => {
  if (state.toast.show) commit('HIDE_TOAST')

  setTimeout(() => {
    commit('SHOW_TOAST', {
      color: 'success',
      message,
      timeout: 3000
    })
  })
}

export default {
  showToast,
  showError,
  showSuccess
}
