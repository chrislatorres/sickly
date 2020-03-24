const HtmlWebPackPlugin = require("html-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
  favicon: "./public/favicon.ico",
});


module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true
            }
          }
	]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/, 
	use: [
		'file-loader',	
             ],
      }
    ],
  },
  plugins: [
    htmlPlugin,
    new ManifestPlugin({
      seed: {
        "name": "Sickly",
        "short_name": "Sickly",
        "start_url": "/",
        "icons": [{
                "src": "https://user-images.githubusercontent.com/29695350/77392644-6f07d780-6d69-11ea-8507-90fb94c92ed5.png",
                "sizes": "192x192"
            }, 
        ],
        "background_color": "#000000",
        "display": "fullscreen",
        "theme_color": "#000000"
      }
    }),
    new WorkboxPlugin.GenerateSW()
  ]
}
