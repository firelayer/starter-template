import { auth, realtime } from '../firebase'
import store from '../store'
import router from '../router'

/*
|---------------------------------------------------------------------
| Listen to Firebase authentication changes
|---------------------------------------------------------------------
|
| Show and hide splash loading screen while the Firebase Auth resolves
| the user's state of the authentication and will trigger the app to
| display it's content. If any changes are made to the user's custom
| claims, trigger a refresh auth token.
|
|
*/
auth().onAuthStateChanged(async (user) => {
  const { name,  meta: { requiresAuth, redirectIfAuth } } = router.currentRoute

  if (name === 'error') {
    store.commit('app/SET_ISAPPREADY', true)
    hideLoading()

    return
  }

  showLoading()

  if (store.state.app.isAppReady) store.commit('app/SET_ISAPPREADY', false)

  if (user) {
    // listen to changes on the user claims to trigger a token refresh
    const metadataRef = realtime().ref(`_users/${user.uid}`)

    metadataRef.on('value', async (snapshot) => {
      const token = await user.getIdTokenResult(true)
      const { claims } = token

      store.commit('app/SET_ISAPPREADY', false)

      if (!claims.admin) {
        if (name !== 'unauthorized') router.push({ name: 'unauthorized' })
      } else {
        if (redirectIfAuth) {
          router.push({ name: 'dashboard' })
        }

        store.commit('app/INITIALIZED', { user: { uid: user.uid, email: user.email }, claims })
      }

      setTimeout(() => {
        store.commit('app/SET_ISAPPREADY', true)
        hideLoading()
      }, 100)
    }, (err) => {
      console.log(`Encountered error: ${err}`)
    })
  } else {
    if (requiresAuth) {
      router.push({ name: 'login' })
    }

    if (store.state.app.user !== null) store.commit('app/RESET')

    setTimeout(() => {
      store.commit('app/SET_ISAPPREADY', true)
      hideLoading()
    }, 100)
  }

  return
})

/**
 * Helpers to hide and show loading splash
 */
const elemLoading = document.getElementById('loading')

function showLoading() {
  elemLoading.style.display = 'flex'
}

function hideLoading() {
  elemLoading.style.display = 'none'
}
