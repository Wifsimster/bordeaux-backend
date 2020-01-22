const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: [path.join(__dirname, '../src/server.js')],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'backend.js',
    path: path.resolve('dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      DIR_NAME: JSON.stringify('dist')
    })
  ],
  resolve: {
    modules: [path.join(__dirname, '../src/'), 'node_modules'],
    alias: {
      channels: path.join(__dirname, '../src/channels/'),
      classes: path.join(__dirname, '../src/classes/'),
      cron: path.join(__dirname, '../src/cron/'),
      data: path.join(__dirname, '../src/data/'),
      utils: path.join(__dirname, '../src/utils/')
    }
  }
}
