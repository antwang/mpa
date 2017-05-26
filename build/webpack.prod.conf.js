var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var needHash = JSON.parse(process.env.npm_config_argv).remain[0] === 'prod'
console.log(needHash)
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.prod.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.prod.productionSourceMap,
      extract: true
    })
  },
  devtool: config.prod.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.prod.assetsRoot,
    filename: needHash ? utils.assetsPath('js/[name].[chunkhash].js') : utils.assetsPath('js/[name].js'),
    chunkFilename: needHash ? utils.assetsPath('js/[id].[chunkhash].js') : utils.assetsPath('js/[id].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: needHash ? utils.assetsPath('css/[name].[contenthash].css') : utils.assetsPath('css/[name].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.prod.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.prod.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.prod.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.prod.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

let views = utils.getEntry('src/views/*.html')
for (let page in views) {
  if (page in webpackConfig.entry) {
    var conf = {
      filename: path.resolve(__dirname, '../dist/', page + '.html'),
      template: views[page],
      chunks: ['vendors', page],
      chunksSortMode: 'dependency',
      inject: true,
      // favicon: '../src/imgs/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
	}
}
module.exports = webpackConfig
