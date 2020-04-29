import * as express from 'express'
import { auth } from '../../../firebase/index'
import User from '../../../firebase/user'

const router = express.Router()

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const { limit, nextPageToken } = req.query
    const _limit = parseInt(String(limit)) || 1000
    const _nextPageToken = String(nextPageToken) || undefined

    const listUsersResult = await auth().listUsers(_limit, _nextPageToken)

    return res.send(listUsersResult)
  } catch (err) {
    return next(err)
  }
})

// Get user by user id
router.get('/:uid', async (req, res, next) => {
  try {
    const user = new User(req.params.uid)

    return res.send(await user.get())
  } catch (err) {
    return next(err)
  }
})

// Create a new user
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.user || !req.body.user.email) throw new Error('Please provide a email to create a new user.')

    const user = new User()

    return res.send(await user.create(req.body.user))
  } catch (err) {
    return next(err)
  }
})

// Update user
router.put('/:uid', async (req, res, next) => {
  try {
    const userPayload = req.body.user
    const user = new User(req.params.uid)

    if (userPayload.customClaims) await user.setClaims(userPayload.customClaims)

    return res.send(await user.update(userPayload))
  } catch (err) {
    return next(err)
  }
})

// Delete user
router.delete('/:uid', async (req, res, next) => {
  try {
    const user = new User(req.params.uid)

    await user.delete()

    return res.send('ok')
  } catch (err) {
    return next(err)
  }
})

// Disable user
router.put('/:uid/disabled', async (req, res, next) => {
  try {
    const user = new User(req.params.uid)

    return res.send(await user.setDisabled(req.body.disabled))
  } catch (err) {
    return next(err)
  }
})

// Set user as admin
router.put('/:uid/admin', async (req, res, next) => {
  try {
    const user = new User(req.params.uid)

    return res.send(await user.setAdmin(req.body.admin))
  } catch (err) {
    return next(err)
  }
})

// Revoke access tokens
router.post('/:uid/revoke-tokens', async (req, res, next) => {
  try {
    const user = new User(req.params.uid)

    await user.revokeTokens()

    return res.send('ok')
  } catch (err) {
    return next(err)
  }
})

export default router
