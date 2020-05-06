<template>
  <div class="page">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <div class="menu">
      <div class="page-title">Edit User {{ userData.displayName && `- ${userData.displayName}` }}</div>
      <v-spacer></v-spacer>

      <v-btn :loading="isLoading" icon small @click="_getUser(true)">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <div
      v-if="userData.customClaims && userData.customClaims.admin"
      class="d-flex align-center body-2 font-weight-bold primary--text mb-2"
    >
      <v-icon class="mr-1" small color="primary">mdi-security</v-icon>Administrator
    </div>

    <p class="body-2">
      <span class="font-weight-bold mr-1">ID</span>
      <copy-label :text="user.uid" />
      <br />

      <span class="font-weight-bold mr-1">Email</span>
      <copy-label :text="userData.email" />
    </p>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">Account</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-account">
        <account-tab ref="tabs-account"></account-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import CopyLabel from '../../components/common/CopyLabel'
import AccountTab from './edit/AccountTab'

export default {
  components: {
    CopyLabel,
    AccountTab
  },
  data() {
    return {
      tab: null,
      breadcrumbs: [{
        text: 'Users',
        disabled: false,
        to: '/users',
        exact: true
      }, {
        text: 'Edit User',
        disabled: true
      }]
    }
  },
  computed: {
    ...mapState('users/edit-user', ['user', 'isLoading']),
    userData() {
      return this.user.data ? this.user.data : {}
    }
  },
  mounted() {
    this._getUser()
  },
  methods: {
    ...mapActions('users/edit-user', ['getUser']),
    ...mapMutations('users/edit-user', {
      resetUser: 'RESET_USER'
    }),
    _getUser(refresh = false) {
      const { uid } = this.$route.params

      if (this.user.uid !== uid || refresh) {
        this.getUser(uid)
      }
    }
  }
}
</script>
