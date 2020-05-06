import Vue from 'vue'
import Vuex from 'vuex'
import AppModule from './app'
import DashboardModule from './dashboard'
import UsersModule from './users'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app: AppModule,
    dashboard: DashboardModule,
    users: UsersModule
  }
})

export default store
