import * as admin from 'firebase-admin'
import config from '../config'

let firebaseConfig = {}

// Local development
if (process.env.NODE_ENV !== 'production') {
  firebaseConfig = {
    credential: admin.credential.applicationDefault(),
    databaseURL: config.firebase.databaseURL
  }
}

admin.initializeApp(firebaseConfig)

export const { auth, storage } = admin
export const db = admin.firestore
export const realtime = admin.database
export const timestamp = admin.firestore.Timestamp.now
export const { serverTimestamp } = admin.firestore.FieldValue

export { User, Firemodel } from '@firelayer/core'
