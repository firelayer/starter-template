import * as functions from 'firebase-functions'

/*
|---------------------------------------------------------------------
| Triggers
|---------------------------------------------------------------------
|
| Functions for triggered events calls
|
*/
export * from './triggers/index'

/*
|---------------------------------------------------------------------
| API
|---------------------------------------------------------------------
|
| ExpressJS with examples
|
*/
export const api = functions.https.onRequest(lazy('./api'))

/*
|---------------------------------------------------------------------
| Jobs (PubSub)
|---------------------------------------------------------------------
|
| Scheduled functions automatically called every x time
|
*/
// export const pingService = functions.pubsub.schedule('every 1 mins').onRun(lazy('./jobs/pingService'))

/**
 * Lazy load package / file
 *
 * @param {string} pkg - Package or file name
 */
function lazy(pkg: string) {
  return (...args) => require(pkg).default(...args)
}
