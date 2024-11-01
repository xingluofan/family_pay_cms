module.exports = {
  publicPath: './',
  outputDir: 'docs',
  pwa: {
    name: 'My Offline App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#ffffff'
    },
    workboxOptions: {
      // 开启 skipWaiting 和 clientsClaim 以确保 Service Worker 立即接管
      skipWaiting: true,
      clientsClaim: true,
      // 缓存策略 - 默认缓存静态文件
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://xingluofan\\.github\\.io/family_pay_cms/.*'),
          handler: 'CacheFirst', // 优先使用缓存
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 50, // 缓存的最大文件数量
              maxAgeSeconds: 30 * 24 * 60 * 60 // 缓存30天
            }
          }
        }
      ]
    }
  }
}