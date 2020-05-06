import actions from './actions'
import mutations from './mutations'

const state = {
  toast: {
    show: false,
    color: 'black',
    message: '',
    timeout: 3000
  },

  // User
  user: null,
  claims: null,
  isAppReady: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
