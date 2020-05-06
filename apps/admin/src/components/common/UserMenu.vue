<template>
  <v-menu offset-y bottom left>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-avatar size="40" color="grey lighten-2 elevation-1">
          <v-img v-if="user.photoURL" :src="user.photoURL" />
          <span v-else>{{ getInitials(user.displayName) }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-list>
      <v-list-item >
        <v-list-item-title class="px-1" @click.stop.prevent="setDark">
          <v-switch
            v-model="darkMode"
            dense
            inset
            label="Dark mode"
          ></v-switch>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="signOut">
        <v-list-item-title>Sign Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { auth } from '../../firebase'

export default {
  data() {
    return {
      darkMode: false
    }
  },
  computed: {
    user: function() {
      return auth().currentUser
    }
  },
  created() {
    try {
      this.darkMode = JSON.parse(localStorage.getItem('darkMode'))

      this.$vuetify.theme.dark = this.darkMode
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    setDark() {
      this.$vuetify.theme.dark = this.darkMode
      localStorage.setItem('darkMode', this.darkMode)
    },
    getInitials(name) {
      if (name) {
        const initials = name.match(/\b\w/g) || []

        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      }

      return ''
    },
    async signOut() {
      try {
        await auth().signOut()

        window.location = '/'
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
