// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = 'style-loader'

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fallback: {
      fs: false,
      net: false,
      zlib: false,
      http: false,
      node: false,
      util: false,
      path: false,
      stream: false,
      crypto: false,
      async_hooks: false,
    },
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
  } else {
    config.mode = 'development'
  }
  return config
}
