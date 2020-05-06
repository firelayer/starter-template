const path = require('path')
const appName = path.basename(path.resolve(process.cwd()))
const config = JSON.parse(process.env[appName] || '{ "firebase": {} }')

process.env.VUE_APP_CONFIG = process.env[appName]

module.exports = {
  chainWebpack: (config) => {
    // remove vue-cli-service's progress output because of lerna run output
    config.plugins.delete('progress')

    // optionally replace with another progress output plugin
    // `yarn workspace admin add simple-progress-webpack-plugin -D` to use
    // config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
    //   {
    //     format: 'minimal' // options are minimal, compact, expanded, verbose
    //   }
    // ])
  },
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
    proxy: {
      '/api': {
        target: `http://localhost:5000/${config.firebase.projectId}/api`
      }
    }
  }
}
