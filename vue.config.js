module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/family_pay_cms/' : '/',
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      importWorkboxFrom: 'local',
      importsDirectory: 'js',
      navigateFallback: '/',
      navigateFallbackBlacklist: [/\/api\//]
    }
  }
}