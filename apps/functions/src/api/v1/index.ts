import { Router } from 'express'
import hasPermission, { LEVELS } from './middlewares/hasPermission'
import auth from './middlewares/auth'
import exampleWebhook from './webhooks/example'
import usersController from './controllers/users'

// @ts-ignore
const router = Router()

/*
|---------------------------------------------------------------------
| Public API
|---------------------------------------------------------------------
|
| Endpoints that everyone can access without authentication
|
*/
router.get('/', (req, res) => {
  res.send({
    version: '1.0.0'
  })
})

/*
|---------------------------------------------------------------------
| Webhooks
|---------------------------------------------------------------------
|
| Callback endpoints for external services, still on public API
|
*/
router.get('/webhooks/example', exampleWebhook)

/*
|---------------------------------------------------------------------
| Authenticated Endpoints
|---------------------------------------------------------------------
|
| The endpoints bellow this point can only be access by authenticated
| users with valid credentials
|
*/

// Use the auth middleware to validate user (if logged)
router.use(auth)

// Example endpoint to verify logged user
router.get('/check-logged', (req, res) => {
  res.send({
    message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
  })
})

router.use('/users', hasPermission(LEVELS.SUPERADMIN), usersController)

export default router
