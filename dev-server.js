const
  fs = require('fs'),
  https = require('https'),
  express = require('express'),
  webpack = require('webpack')

const app = express()

;(function() {
  const webpackConfig = require(process.env.WEBPACK_CONFIG || './webpack.config')

  const compiler = webpack(webpackConfig)

  app
    .use(require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      // writeToDisk: true,
      index: 'index.html'
    }))
    .use(require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: `${webpackConfig.output.publicPath}__webpack_hmr`,
      heartbeat: 10 * 1000,
    }))
})()

if (require.main === module) {
  const server = https.createServer({
    pfx: fs.readFileSync('./webpack/certificate/localhost.pfx'),
    passphrase: 'localhost',
  }, app)
  server.listen(process.env.PORT || 8080, () =>
    console.log('Listening on %j', server.address())
  )
}
