import api from '../../api'

export class User {
  constructor(uid, data) {
    this.data = data || {}

    if (uid) {
      this.uid = uid
    }
  }

  get id() {
    return this.uid
  }

  async get() {
    if (!this.uid) throw new Error('Cannot get user when uid is not set')

    try {
      const { data } = await api.get(`/users/${this.uid}`)

      this.data = data

      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async create(payload) {
    try {
      const { data } = await api.post('/users', {
        user: payload
      })

      this.uid = data.uid
      this.data = data

      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async save(payload) {
    try {
      const { data } = await api.put(`/users/${this.uid}`, {
        user: payload
      })

      this.data = data

      return data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }

  async delete() {
    await api.delete(`/users/${this.uid}`)

    this.uid = null
    this.data = {}
  }

  sendVerificationEmail() {
    return api.post(`/users/${this.uid}/verification-email`)
  }

  sendResetPasswordEmail() {
    return api.post(`/users/${this.uid}/password-reset`)
  }

  async setAdmin(admin) {
    await api.put(`/users/${this.uid}/admin`, {
      admin
    })

    this.data.customClaims = {
      ...this.data.customClaims,
      admin: admin ? 1 : undefined
    }
  }

  async setDisabled(disabled) {
    await api.put(`/users/${this.uid}/disabled`, {
      disabled
    })

    this.data.disabled = disabled
  }

  revokeTokens() {
    return api.post(`/users/${this.uid}/revoke-tokens`)
  }
}

export default User
