var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var SpritesmithPlugin = require('webpack-spritesmith')
var spriteTemplate = require('./spriteTemplate')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: utils.getEntry('src/pages/*.js'),
  output: {
    path: config.prod.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.prod.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: ['node_modules', path.resolve(__dirname, '../src/styles/sprite')],
    alias: {
      '@': resolve('src'),
      'vue$': 'vue/dist/vue.esm.js',
      '~sprite.png': resolve('src/styles/sprite/sprite.png')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: resolve('src/assets/icon'),
        glob: '*.png'
      },
      target: {
        image: resolve('src/styles/sprite/sprite.png'),
        css: [
          resolve('src/styles/sprite/sprite_def.scss'),
          [resolve('src/styles/sprite/sprite_rem.scss'), {
            format: 'rem_template'
          }],
          [resolve('src/styles/sprite/sprite_px.scss'), {
            format: 'px_template'
          }]
        ]
      },
      customTemplates: {
        'rem_template': spriteTemplate(config.sprite.toRem),
        'px_template': spriteTemplate(config.sprite.toPx)
      },
      apiOptions: {
        cssImageRef: '~sprite.png'
      }
    })
  ]
}
