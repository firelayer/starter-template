<template>
  <div>
    <h1>Unauthorized</h1>
    <v-btn color="primary" @click="signOut">Sign Out</v-btn>
  </div>
</template>

<script>
import { auth } from '../../firebase'

export default {
  methods: {
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
