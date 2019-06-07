const browserslist = require('browserslist');
const path = require('path');

// Actual compilation
module.exports = [{
  devServer: {
    contentBase: path.resolve(__dirname, 'build/')
  },
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/js/index.js')
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: '[name].min.js',
    library: 'timeline',
    libraryTarget: 'var'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      // Babel transpilation for certain browser targets
      {
        exclude: [
          /(node_modules)/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {
              targets: {
                browsers: browserslist()
              },
              useBuiltIns: true
            }]]
          }
        }
      }, {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')(browserslist())
              ]
            }
          }
        ]
      }
    ]
  }
}];
