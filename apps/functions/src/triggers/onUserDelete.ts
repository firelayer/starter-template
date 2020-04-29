import User from '../firebase/user'

export default async (newUser) => {
  const user = new User(newUser)

  // example: on delete, remove the user from other services

  const { user: customClaims } = user

  if (customClaims['mailchimpId']) {
    // return await removefromservice
    return 'ok'
  }

  return 'ok'
}
