<template>
  <v-card>
    <v-card-title>
      Search
      <v-spacer></v-spacer>
      <v-btn :loading="isLoading" icon small @click="getUsers(true)">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>

    <div class="d-md-flex ma-2 align-center">
      <v-text-field
        v-model="searchQuery"
        append-icon="mdi-magnify"
        class="flex-grow-1 mr-md-2"
        label="Search for"
        placeholder="uid, email or phone"
        @keyup.enter="searchUser(searchQuery)"
      ></v-text-field>
      <v-btn
        :loading="isLoading"
        color="black"
        dark
        @click="searchUser(searchQuery)"
      >
        <v-icon left>mdi-magnify</v-icon>Search
      </v-btn>
    </div>

    <!-- users list -->
    <v-data-table
      :loading="isLoading"
      :headers="headers"
      :items="items"
      :custom-sort="items => items"
      loading-text="Loading... Please wait"
      hide-default-footer
      class="user-table"
    >
      <template v-slot:item.metadata.creationTime="{ item }">
        <div>{{ formatDate(item.metadata.creationTime) }}</div>
      </template>

      <template v-slot:item.metadata.lastSignInTime="{ item }">
        <div>{{ formatDate(item.metadata.lastSignInTime) }}</div>
      </template>

      <template v-slot:item.email="{ item }">
        <CopyLabel :text="item.email" />
      </template>

      <template v-slot:item.uid="{ item }">
        <CopyLabel :text="item.uid" />
      </template>

      <template v-slot:item.customClaims.admin="{ item }">
        <v-chip
          v-if="$get(item, 'customClaims.admin', '') === 1"
          label
          small
          color="primary"
          class="overline"
        >
          <v-icon left x-small>mdi-security</v-icon>
          Admin
        </v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <div class="actions">
          <v-btn icon @click="open(item)">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
      </template>

      <template v-slot:no-data>
        <p>
          <br />Empty list
        </p>
        <p>
          <v-btn color="primary" @click="getUsers">Get Users</v-btn>
        </p>
      </template>
    </v-data-table>

    <fire-table-pagination
      :page="page"
      :has-more="hasMore"
      :is-loading="isLoading"
      @next="nextPage"
      @prev="prevPage"
    />
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import config from '../../config'
import { User } from '../../firebase'
import CopyLabel from '../common/CopyLabel'
import FireTablePagination from '../common/FireTable/FireTablePagination'

export default {
  components: {
    CopyLabel,
    FireTablePagination
  },
  data() {
    return {
      searchQuery: '',

      isAdmin: false,
      // search fields
      headers: [
        { text: 'Email', value: 'email', sortable: false },
        { text: 'Name', align: 'left', value: 'displayName', sortable: false },
        { text: 'Created', value: 'metadata.creationTime', sortable: false },
        { text: 'Verified', value: 'emailVerified', sortable: false },
        { text: 'Last SignIn', value: 'metadata.lastSignInTime', sortable: false },
        { text: 'Disabled', value: 'disabled', sortable: false },
        { text: 'Claims', value: 'customClaims.admin', sortable: false },
        { text: 'User Id', align: 'left', value: 'uid', sortable: false },
        { text: '', sortable: false, align: 'right', value: 'action' }
      ]
    }
  },
  computed: {
    ...mapGetters('users', ['hasMore']),
    ...mapState('users', ['items', 'query', 'page', 'isLoading'])
  },
  watch: {
    query(val) {
      this.searchQuery = val
    }
  },
  created() {
    this.searchQuery = this.query
  },
  mounted() {
    if (this.items.length === 0) this.getUsers()
  },
  methods: {
    ...mapActions('users', ['getUsers', 'nextPage', 'prevPage', 'searchUser']),
    ...mapMutations('users/edit-user', {
      setUser: 'SET_USER'
    }),
    open(item) {
      if (item instanceof User) this.setUser(item)
      else this.setUser(new User(item.uid, item))
      this.$router.push(`/users/${item.uid}`)
    },
    formatDate(date) {
      if (date) {
        return moment(date).format('lll')
      }

      return ''
    }
  }
}
</script>
