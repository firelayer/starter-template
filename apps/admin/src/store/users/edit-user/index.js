import actions from './actions'
import mutations from './mutations'

const state = {
  user: {},
  isLoading: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
