'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

/* 导入数据 */
// const videoData = require('../src/public/json/video')
// const topData = require('../src/public/json/top')
// const dyData = require('../src/public/json/dy')
// 头条
// const headline = require('http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html')
// // 精选
// const choiceness = require('http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html')
// // 科技
// const science = require('http://data.live.126.net/livechannel/classifylist.json ')
// // 漫画
// const cartoon = require('http://c.m.163.com/nc/article/list/T1444270454635/0-20.html ')
// // 体育(需要使用arguments属性调用)
// const sports = require('https://3g.163.com/touch/reconstruct/article/list/BA8E6OEOwangning/0-20.html')

// const sports = require('../src/public/json/news')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // before: function (app) {
    //   app.get('/api/video', function (req, res) {
    //     res.json({
    //       data: videoData.video
    //     })
    //   })
    //   app.get('/api/top', function (req, res) {
    //     res.json({
    //       data: topData.ratings
    //     })
    //   })
    //   app.get('/api/dy', function (req, res) {
    //     res.json({
    //       data: dyData
    //     })
    //   })
    // },
    proxy: config.dev.proxyTable,
    contentBase: false, // since we use CopyWebpackPlugin.
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins:
    [
      new webpack.DefinePlugin({
        'process.env': require('../config/dev.env')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
    ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
