import { Agent, request } from 'http'

const agent = new Agent({ keepAlive: true })

export default (context) => {
  const req = request({
    host: '', // host you wish to ping
    port: 80,
    path: '/api',
    method: 'GET',
    agent
  }, (res) => {
    res.setEncoding('utf8')
    res.on('end', () => {
      console.info('PingService: API Ping Success')
    })
  })

  req.on('error', (e) => {
    console.error('Error: Problem with request ' + e.message)
  })

  req.end()
}
