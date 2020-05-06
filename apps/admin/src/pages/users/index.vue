<template>
  <div class="page">
    <div class="menu">
      <div class="page-title">
        <div>Users</div>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createDialog = true">
          <v-icon left>mdi-plus</v-icon>Create User
        </v-btn>
      </div>
    </div>

    <users-table></users-table>

    <!-- create user dialog -->
    <v-dialog v-model="createDialog" :persistent="isLoadingCreate" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create User</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newUserEmail" label="Email" required @keyup.enter="_createUser"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="isLoadingCreate"
            color="grey darken-1"
            text
            @click="createDialog = false"
          >Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn :loading="isLoadingCreate" color="primary" text @click="_createUser">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { User } from '../../firebase'
import UsersTable from '../../components/tables/UsersTable'

export default {
  components: {
    UsersTable
  },
  data() {
    return {
      isLoadingCreate: false,
      createDialog: false,
      newUserEmail: ''
    }
  },
  methods: {
    ...mapActions('users', ['createUser', 'getUsers']),
    ...mapMutations('users/edit-user', {
      setUser: 'SET_USER'
    }),
    open(item) {
      if (item instanceof User) this.setUser(item)
      else this.setUser(new User(item.uid, item))
      this.$router.push(`/users/${item.uid}`)
    },
    async _createUser() {
      this.isLoadingCreate = true

      const user = await this.createUser(this.newUserEmail)

      this.getUsers(true)

      if (user) {
        this.newUserEmail = ''
        this.isLoadingCreate = false
        this.open(user)
      } else {
        this.isLoadingCreate = false
      }
    }
  }
}
</script>
