<template>
  <div>
    <!-- Loading -->
    <div v-if="isLoading" class="text-center mt-6 mb-6">
      <v-progress-circular :size="30" :width="2" color="primary" indeterminate></v-progress-circular>
    </div>

    <div v-else>
      <v-card v-if="user.data.disabled" class="warning mb-4">
        <v-card-title>User Disabled</v-card-title>
        <v-card-subtitle>This user has been disabled! Login accesss has been revoked.</v-card-subtitle>
        <v-card-text>
          <v-btn :loading="isLoadingDisabled" dark @click="enableUser">
            <v-icon left small>mdi-account-check</v-icon>Enable User
          </v-btn>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Basic Information</v-card-title>
        <v-card-text>
          <div class="d-flex">
            <v-img
              :src="user.data.photoURL"
              aspect-ratio="1"
              class="blue-grey lighten-4 user-photo elevation-3"
              max-width="100"
              max-height="100"
            ></v-img>
            <div class="user-form">
              <v-form ref="form" v-model="isFormValid" lazy-validation>
                <v-text-field v-model="user.data.displayName" label="Display name" placeholder="name"></v-text-field>
                <v-text-field
                  v-model="user.data.phoneNumber"
                  label="Phone Number"
                  placeholder="+12345678"
                  :rules="[rules.phone]"
                ></v-text-field>
                <v-text-field v-model="user.data.email" label="Email" hide-details></v-text-field>

                <div class="d-flex align-center">
                  <v-checkbox v-model="user.data.emailVerified" dense label="Email Verified"></v-checkbox>
                  <v-btn
                    v-if="!user.data.emailVerified"
                    :loading="isLoadingSendVerification"
                    class="ml-4"
                    @click="_sendVerificationEmail"
                  >
                    <v-icon left small>mdi-email</v-icon>Send Verification Email
                  </v-btn>
                </div>

                <div class="mt-2">
                  <v-btn :loading="isLoadingSave" color="primary" @click="save">Save</v-btn>
                </div>
              </v-form>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-expansion-panels v-model="panel" multiple class="mt-3">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Actions</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mb-2">
              <div class="title">Reset User Password</div>
              <div class="subtitle mb-2">Sends a reset password email to the user.</div>
              <v-btn
                :loading="isLoadingResetPassword"
                class="mb-2"
                @click="_sendResetPasswordEmail"
              >
                <v-icon left small>mdi-email</v-icon>Send Reset Password Email
              </v-btn>
            </div>

            <hr />

            <div class="mb-2">
              <div class="title">Export Account Data</div>
              <div class="subtitle mb-2">Export all the platform metadata for this user.</div>
              <v-btn :disabled="isLoading" class="mb-2" @click="exportUserData">
                <v-icon left small>mdi-clipboard-account</v-icon>Export User Data
              </v-btn>
            </div>

            <hr />

            <div class="mb-2">
              <div class="error--text title">Danger Zone</div>
              <div class="subtitle mb-2">Full administrator with access to this dashboard.</div>

              <v-btn
                v-if="Boolean(user.data.customClaims && user.data.customClaims.admin)"
                :loading="isLoadingAdmin"
                color="primary"
                @click="_setAdmin(false)"
              >
                <v-icon left small>mdi-security</v-icon>Remove admin access
              </v-btn>
              <v-btn v-else :loading="isLoadingAdmin" color="primary" @click="_setAdmin(true)">
                <v-icon left small>mdi-security</v-icon>Set User as Admin
              </v-btn>

              <hr />
              <div
                class="subtitle mb-2"
              >Revoke all refresh access tokens. Existing ID tokens may remain active until their natural expiration (one hour).</div>
              <v-btn :loading="isLoadingRevoke" color="warning" @click="_revokeTokens">
                <v-icon left small>mdi-security</v-icon>Revoke Access Tokens
              </v-btn>

              <hr />
              <div class="subtitle mt-3 mb-2">Prevent the user from signing in on the platform.</div>
              <v-btn
                v-if="user.data.disabled"
                :loading="isLoadingDisabled"
                color="warning"
                @click="enableUser"
              >
                <v-icon left small>mdi-account-check</v-icon>Enable User
              </v-btn>
              <v-btn
                v-else
                :loading="isLoadingDisabled"
                color="warning"
                @click="disableDialog = true"
              >
                <v-icon left small>mdi-cancel</v-icon>Disable User
              </v-btn>

              <hr />
              <div
                class="subtitle mt-3 mb-2"
              >To delete the user please transfer ownership or delete user's subscriptions.</div>
              <v-btn :loading="isLoadingDelete" color="error" @click="deleteDialog = true">
                <v-icon left small>mdi-delete</v-icon>Delete User
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Metadata</v-expansion-panel-header>
          <v-expansion-panel-content class="body-2">
            <span class="font-weight-bold">Created</span>
            {{ user.data.metadata && user.data.metadata.creationTime }}
            <br />
            <span class="font-weight-bold">Last Sign In</span>
            {{ user.data.metadata && user.data.metadata.lastSignInTime }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Custom Claims</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              class="error--text mb-2"
            >Custom claims have essencial information regarding Super Admin privileges, external services information, changing it manually may break some features.</div>
            <json-editor :value="user.data.customClaims" @change="text => tempCustomClaims = text" />
            <div class="mt-2 font-weight-bold">Preview</div>
            <pre class="mb-2 body-2">{{ tempCustomClaims }}</pre>
            <v-btn :loading="isLoadingCustomClaims" color="warning" @click="_saveCustomClaims()">
              <v-icon left small>mdi-alert</v-icon>Save Custom Claims
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Raw Data</v-expansion-panel-header>
          <v-expansion-panel-content>
            <pre class="body-2">{{ user }}</pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- disable modal -->
    <v-dialog v-model="disableDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Disable User</v-card-title>
        <v-card-text>Are you sure you want to disable this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="disableDialog = false">Cancel</v-btn>
          <v-btn :loading="isLoadingDisabled" color="warning" @click="_disableUser()">Disable</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete modal -->
    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false">Cancel</v-btn>
          <v-btn :loading="isLoadingDelete" color="error" @click="_deleteUser()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import JsonEditor from '../../../components/common/JsonEditor'

export default {
  components: {
    JsonEditor
  },
  data() {
    return {
      panel: [1],
      deleteDialog: false,
      disableDialog: false,

      // form
      isFormValid: true,
      rules: {
        required: (value) => (value && Boolean(value)) || 'Required',
        phone: (value) => !value || /^\+[1-9]\d{4,14}$/.test(value) || 'Invalid phone number format'
      },

      isLoadingSave: false,
      isLoadingDisabled: false,
      isLoadingDelete: false,
      isLoadingRevoke: false,
      isLoadingAdmin: false,
      isLoadingResetPassword: false,
      isLoadingSendVerification: false,
      isLoadingCustomClaims: false,

      tempCustomClaims: ''
    }
  },
  computed: {
    ...mapState('users/edit-user', ['user', 'isLoading'])
  },
  watch: {
    user() {
      this.tempCustomClaims = this.$get(this.user, 'data.customClaims', '')
    }
  },
  mounted() {
    this.tempCustomClaims = this.$get(this.user, 'data.customClaims', '')
  },
  methods: {
    ...mapActions('users/edit-user', [
      'saveUser',
      'deleteUser',
      'setAdmin',
      'setDisabled',
      'sendResetPasswordEmail',
      'sendVerificationEmail',
      'exportUserData',
      'revokeTokens'
    ]),
    async save() {
      if (!this.$refs.form.validate()) return

      this.isLoadingSave = true

      const { displayName, email, emailVerified, phoneNumber } = this.user.data

      await this.saveUser({
        displayName,
        email,
        emailVerified,
        phoneNumber: phoneNumber || undefined
      })

      this.isLoadingSave = false
    },
    async _saveCustomClaims() {
      this.isLoadingCustomClaims = true

      await this.saveUser({
        customClaims: this.tempCustomClaims
      })

      this.isLoadingCustomClaims = false
    },
    async _deleteUser(item) {
      this.isLoadingDelete = true
      await this.deleteUser()

      this.deleteDialog = false
      this.isLoadingDelete = false

      this.$router.replace({
        name: 'users'
      })
    },
    async _disableUser(item) {
      this.isLoadingDisabled = true

      await this.setDisabled(true)

      this.disableDialog = false
      this.isLoadingDisabled = false
    },
    async enableUser() {
      this.isLoadingDisabled = true

      await this.setDisabled(false)

      this.isLoadingDisabled = false
    },
    async _sendResetPasswordEmail() {
      this.isLoadingResetPassword = true

      await this.sendResetPasswordEmail()

      this.isLoadingResetPassword = false
    },
    async _sendVerificationEmail() {
      this.isLoadingSendVerification = true

      await this.sendVerificationEmail()

      this.isLoadingSendVerification = false
    },
    async _revokeTokens() {
      this.isLoadingRevoke = true

      await this.revokeTokens()

      this.isLoadingRevoke = false
    },
    async _setAdmin(admin = false) {
      this.isLoadingAdmin = true

      await this.setAdmin(admin)

      this.isLoadingAdmin = false
    }
  }
}
</script>

<style lang="scss" scoped>
.space-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-photo {
  border-radius: $border-radius-root;
}

.user-form {
  padding-left: 24px;
  flex: 1;
}

.actions {
  padding: 24px 0;
}
</style>
