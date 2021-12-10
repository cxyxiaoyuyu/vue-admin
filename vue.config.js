const path = require('path')
module.exports = {
  lintOnSave: false,
  outputDir: path.resolve(__dirname, './dist'),
  publicPath: '/',
  configureWebpack: { 
    devtool: 'source-map',
  },
  chainWebpack: config => {
    // production
    config.when(process.env.NODE_ENV === 'production',config => {
      config.entry('app').clear().add('./src/main-prod.js')

      config.plugin('html').tap(args => {
        args[0].isProd = true 
        return args
      })
      config.devtool('source-map')
    })

    // development
    config.when(process.env.NODE_ENV === 'development',config => {
      config.entry('app').clear().add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}