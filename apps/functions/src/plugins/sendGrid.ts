import * as sendGrid from '@sendgrid/mail'
import config from '../config'

sendGrid.setApiKey(config.sendGrid.API_KEY)

export const sendEmail = (params) => {
  const { to, subject, html } = params

  return sendGrid.send({
    to,
    from: {
      email: config.sendGrid.noReplyEmail
    },
    subject,
    html
  })
}
