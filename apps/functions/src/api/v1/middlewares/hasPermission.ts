import { db } from '../../../firebase/index'

export const LEVELS = {
  SUPERADMIN: 'SUPERADMIN',
  MEMBER: 'MEMBER'
}

/*
|---------------------------------------------------------------------
| Has Permission Middleware
|---------------------------------------------------------------------
|
| Verify if the user has permission to access the resource
|
*/
export default (level) => async (req, res, next) => {
  const { user } = res.locals

  if (!user) return res.sendStatus(401)

  let hasPermission = false

  if (level === LEVELS.SUPERADMIN) {
    hasPermission = isSuperAdmin(user)
  }

  if (level === LEVELS.MEMBER) {
    hasPermission = await isMember('workspaceIdExample', user)
  }

  if (hasPermission) {
    return next()
  } else {
    return res.sendStatus(401)
  }
}

function isSuperAdmin(user) {
  return user.admin
}

/**
 * Example isMember function
 *
 * @param workspaceId
 * @param user
 */
async function isMember(workspaceId, user) {
  const { uid } = user

  // verify if workspace has member with the uid
  const member = await db().doc(`workspaces/${workspaceId}/members/${uid}`).get()

  return member.exists
}
