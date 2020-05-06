let config = {}

try {
  config = JSON.parse(process.env.VUE_APP_CONFIG)
} catch (error) {
  config = {}
}

export default config
