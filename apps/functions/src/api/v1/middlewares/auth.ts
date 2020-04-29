import { auth } from '../../../firebase/index'

/*
|---------------------------------------------------------------------
| Firebase authentication middleware
|---------------------------------------------------------------------
|
| Verify if the user is authenticated and sets the user on response
| so that the hasPermission middleware can use to verify permissions
|
*/
export default async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return next()
    }

    const { 1: idToken } = authorization.split('Bearer ')
    const decodedToken = await auth().verifyIdToken(idToken)

    res.locals = {
      user: decodedToken
    }
  } catch (error) {
    console.error('Error: Verifying Firebase ID token: ', error)
  }

  return next()
}
