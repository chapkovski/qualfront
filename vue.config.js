module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/qualfront/'
  : '/',
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ]
}
