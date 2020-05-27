const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
    configureWebpack: {
      plugins: [
        new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 8192,
        minRatio: 0.8
        }),
        new BrotliPlugin({
          asset: '[path].br[query]',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      ]
    },   
    // vue.config.js
    chainWebpack: (config) => {
      // Alter prefetch settings:
      config.plugin('prefetch').tap(options => {
        if (!options[0].fileBlacklist) options[0].fileBlacklist = []
        options[0].fileBlacklist.push(/\.(css)$/)
        return options
      })
      
    }
  }

  