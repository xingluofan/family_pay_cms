module.exports = {
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