import { User as UserModel, auth, realtime } from './index'

export class User extends UserModel {
  constructor(id?) {
    super(id)
  }

  // update user to trigger refresh user token on client
  sendRefreshTokenTrigger() {
    return realtime().ref(`_users/${this.id}`).set({ refreshTime: new Date().getTime() })
  }

  async setClaims(claims, merge = false) {
    const user = await super.setClaims(claims, merge)

    // update user to trigger refresh user token on client
    await this.sendRefreshTokenTrigger()

    return user
  }

  async setDisabled(disabled = false) {
    const user = await super.setDisabled(disabled)

    await this.sendRefreshTokenTrigger()

    return user
  }

  async revokeTokens() {
    await super.revokeTokens()

    await this.sendRefreshTokenTrigger()
  }

  async sendVerificationEmail() {
    const user = await this.get()
    const link = await auth().generateEmailVerificationLink(user.email)
    const { sendEmail } = await import('../plugins/sendGrid')

    try {
      await sendEmail({
        to: {
          name: user.displayName,
          email: user.email
        },
        subject: 'Verify your email',
        html: `<p>Hello ${user.displayName},</p>
        <p>Follow this link to verify your email address.</p>
        <p><a href='${link}'>${link}</a></p>
        <p>If you didn’t ask to verify this address, you can ignore this email.</p>
        <p>Thanks</p>`
      })
    } catch (error) {
      console.error(error)
      console.log(error.response.body.errors)
    }
  }

  async sendPasswordResetEmail() {
    const user = await this.get()
    const link = await auth().generatePasswordResetLink(user.email)
    const { sendEmail } = await import('../plugins/sendGrid')

    try {
      await sendEmail({
        to: {
          name: user.displayName,
          email: user.email
        },
        subject: 'Password Reset',
        html: `<p>Hello ${user.displayName},</p>
        <p>Follow this link to reset your password.</p>
        <p><a href='${link}'>${link}</a></p>
        <p>If you didn’t ask to reset your password, you can ignore this email.</p>
        <p>Thanks</p>`
      })
    } catch (error) {
      console.error(error)
      console.log(error.response.body.errors)
    }
  }
}

export default User
