module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // production
    config.when(process.env.NODE_ENV === 'production',config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })

    // development
    config.when(process.env.NODE_ENV === 'development',config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}