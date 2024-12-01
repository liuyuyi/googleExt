'use strict'
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup',
    },
    options: {
      template: 'public/browser-extension.html',
      entry: './src/options/main.js',
      title: 'Options',
    },
    sidePanel: {
      template: 'public/browser-extension.html',
      entry: './src/sidePanel/main.js',
      title: 'sidePanel',
    },
    devtool: {
      template: 'public/browser-extension.html',
      entry: './src/devtools/main.js',
      title: 'devtool',
    },
    myPage: {
      template: 'public/browser-extension.html',
      entry: './src/myPage/main.js',
      title: 'myPage',
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        contentScripts: {
          entries: {
            'content-script': ['src/content-scripts/content-script.js'],
          },
        },
      },
      manifestTransformer: (manifest) => {
        manifest.content_security_policy = {
          extension_pages: "script-src 'self'; object-src 'self';",
        }
        return manifest
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin([
        {
          from: 'src/background/service_worker.js',
          to: 'js',
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: 'src/content-scripts/content.css',
          to: '',
        },
      ]),
    ],
    // module: {
    //   rules: [
    //     {
    //       test: /\.s[ac]ss$/i,
    //       use: [
    //         MiniCssExtractPlugin.loader, // 将CSS添加到DOM中
    //         'css-loader', // 将CSS转换成CommonJS模块
    //         'sass-loader', // 将Sass编译成CSS，需要安装sass-loader和sass
    //       ],
    //     },
    //   ],
    // },
    // optimization: {
    //   minimizer: [new OptimizeCssAssetsPlugin()],
    // },
  },
}
