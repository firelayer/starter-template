import Vue from 'vue'
import moment from 'moment'
import { get } from 'lodash'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './firebase'
import vuetify from './plugins/vuetify'
import '../public/style/critical.css'
import './plugins/vue-shortkey'
import './plugins/filters'
import './middlewares'

Vue.prototype.$moment = moment
Vue.prototype.$get = get
Vue.prototype.$firebase = firebase
Vue.prototype.$clipboard = function (text, toastText = 'Copied to clipboard!') {
  const el = document.createElement('textarea')

  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  this.$store.dispatch('app/showToast', toastText)
}

Vue.prototype.$animate = function (node, animationName, callback) {
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
    node.classList.remove('animated', animationName)
    node.removeEventListener('animationend', handleAnimationEnd)

    // eslint-disable-next-line callback-return
    if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
