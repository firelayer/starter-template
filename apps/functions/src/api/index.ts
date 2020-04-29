import * as express from 'express'

const app = express()

export default (req, res) => {
  app.disable('etag')

  // API Versions
  // Latest
  app.use('/api', lazy('./v1'))

  // V1
  app.use('/api/v1', lazy('./v1'))

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err.message || err, '\n', err.stack)
    res.status(err.statusCode || 500).send({
      message: err.message || 'Unexpected error!'
    })
  })

  return app(req, res)
}

/**
 * Lazy load package / file
 *
 * @param {string} pkg - Package or file name
 */
function lazy(pkg: string) {
  return (...args) => require(pkg).default(...args)
}
