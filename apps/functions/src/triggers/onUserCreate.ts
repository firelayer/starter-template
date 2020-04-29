import User from '../firebase/user'

export default async (newUser) => {
  const user = new User(newUser)

  // example: on create, associate the user with another service like mailchimp

  // and set as a custom claim on the user account
  return await user.setClaims({
    mailchimpId: '123'
  })
}
