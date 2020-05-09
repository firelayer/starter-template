const path = require('path')
const appName = path.basename(path.resolve(process.cwd()))
const config = JSON.parse(process.env[appName] || '{ "firebase": {} }')

process.env.VUE_APP_CONFIG = process.env[appName]

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import \'~@/assets/styles/vuetify/_index.scss\''
      },
      scss: {
        prependData: '@import \'~@/assets/styles/vuetify/_index.scss\';'
      }
    }
  },
  // while developing, proxy all /api requests to the local cloud functions emulator
  devServer: {
    progress: false,
    proxy: {
      '/api': {
        target: `http://localhost:5000/${config.firebase.projectId}/api`
      }
    }
  }
}
