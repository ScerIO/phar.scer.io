const
  fs = require('fs'),
  path = require('path'),
  webpack = require('webpack'),
  OfflinePlugin = require('offline-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  { version, homepage } = require('./package')

const mode = process.env.NODE_ENV || 'development',
  plugins = []

const seoFiles = (fs.existsSync('./seo/'))
  ? [{ from: './seo/', to: './' }]
  : []

const entryPoint = [`${__dirname}/src/index.tsx`]

if (mode === 'development') {
  // path = output.publicPath + __webpack_hmr
  entryPoint.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true')
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = {
  mode,

  entry: entryPoint,

  output: {
    path: `${__dirname}/build`,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
    globalObject: 'this'
  },

  devtool: mode === 'production' ? false : 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.json'],
    alias: {
      'theme': path.resolve(__dirname, 'src/theme'),
      'components': path.resolve(__dirname, 'src/components'),
      'containers': path.resolve(__dirname, 'src/containers'),
      'i18n': path.resolve(__dirname, 'src/i18n'),
      'services': path.resolve(__dirname, 'src/services'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'store': path.resolve(__dirname, 'src/store'),
      'react-dom': '@hot-loader/react-dom',
    }
  },

  module: {
    rules: [{
      test: /locales/,
      loader: '@alienfast/i18next-loader',
      query: { relativePathAsNamespace: true }
    }, {
      test: /\.mjs$/,
      type: 'javascript/auto'
    }, {
      test: /\.worker\.ts$/,
      use: [{
        loader: 'worker-loader',
        options: {
          name: 'worker.js',
          publicPath: '/',
        },
      }, {
        loader: 'ts-loader',
      }],
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }, {
      test: /\.(ico|svg|png|jpg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/',
      },
    }]
  },

  optimization: {
    minimize: mode === 'production',
    nodeEnv: process.env.NODE_ENV || 'development',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin([{
      from: './src/manifest.json',
      to: './',
    }, {
      from: './src/assets/icons',
      to: './assets/icons',
    },
    ...seoFiles,
    ]),
    new webpack.DefinePlugin({
      'appVersion': JSON.stringify(version),
      'homepageUrl': JSON.stringify(homepage),
    }),
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      caches: {
        main: [
          'main.bundle.js',
          'vendor.bundle.js',
          'worker.js',
          ':rest:',
        ],
        additional: [
          ':externals:',
        ],
      },
      externals: [
        '/manifest.json',
        '/assets/**/*.*',
        '/',
      ],
      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/',
        publicPath: '/sw.js'
      },
    }),
    ...plugins,
  ],
}
