import * as functions from 'firebase-functions'

// Auth Triggers
export const onUserCreate = functions.auth.user().onCreate(lazy('./onUserCreate'))
export const onUserDelete = functions.auth.user().onDelete(lazy('./onUserDelete'))

/**
 * TRIGGER EXAMPLES
 */

// Database Triggers
// export const onPostCreate = functions.database.ref('/posts/{postId}').onCreate((snap, context) => {})
// export const onPostDelete = functions.database.ref('/posts/{postId}').onDelete((snap, context) => {})
// export const onPostUpdate = functions.database.ref('/posts/{postId}').onUpdate((change, context) => {})
// export const onPostWrite = functions.database.ref('/posts/{postId}').onWrite((change, context) => {})

// Firestore Triggers
// export const onPostCreate = functions.firestore.document('posts/{postId}').onCreate((snap, context) => {})
// export const onPostDelete = functions.firestore.document('posts/{postId}').onDelete((snap, context) => {})
// export const onPostUpdate = functions.firestore.document('posts/{postId}').onUpdate((change, context) => {})
// export const onPostWrite = functions.firestore.document('posts/{postId}').onWrite((change, context) => {})

// Remote Config Triggers
// export const onRemoteConfigUpdate = functions.remoteConfig.onUpdate((versionMetadata) => {})

// Google Analytics Triggers
// export const sendCouponOnPurchase  = functions.analytics.event('in_app_purchase').onLog((event) => { return event.user.userId })

// Crashlytics Triggers
// export const notifyOnNewIssue = functions.crashlytics.issue().onNew(async (issue) => {})
// export const notifyOnRegress = functions.crashlytics.issue().onRegress(async (issue) => {})
// export const notifyOnVelocityAlert = functions.crashlytics.issue().onVelocityAlert(async (issue) => {})

// Cloud Storage Triggers
// export const onFileArchive = functions.storage.object().onArchive(async (object) => {})
// export const onFileDelete = functions.storage.object().onDelete(async (object) => {})
// export const onFileCreate = functions.storage.object().onFinalize(async (object) => {})
// export const onFileMetaUpdate = functions.storage.object().onMetadataUpdate(async (object) => {})

// Cloud Pub/Sub Triggers
// export const helloPubSub = functions.pubsub.topic('topic-name').onPublish((message) => {})

// Test Lab Triggers
// export const sendNotificationOnTestLab = functions.testLab.testMatrix().onComplete((testMatrix) => {})

/**
 * Lazy load package / file
 *
 * @param {string} pkg - Package or file name
 */
function lazy(pkg: string) {
  return (...args) => require(pkg).default(...args)
}
