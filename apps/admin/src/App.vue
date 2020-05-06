<template>
  <v-app v-if="isAppReady">
    <!-- Layout component -->
    <component :is="currentLayout">
      <router-view />
    </component>

    <v-snackbar v-model="toast.show" :timeout="toast.timeout" :color="toast.color" bottom>
      {{ toast.message }}
      <v-btn v-if="toast.timeout === 0" color="white" text @click="toast.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from './firebase'

import initialLayout from './layouts/initial'
import defaultLayout from './layouts/default'
import errorLayout from './layouts/error'

export default {
  components: {
    initialLayout,
    defaultLayout,
    errorLayout
  },
  computed: {
    ...mapState('app', ['toast', 'isAppReady']),
    currentLayout: function() {
      const layout = this.$route.meta.layout || 'default'

      return layout + 'Layout'
    }
  }
}
</script>

<style lang="scss">
@import "./assets/styles/theme.scss";
</style>
