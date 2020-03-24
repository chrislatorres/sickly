const HtmlWebPackPlugin = require("html-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
  favicon: "./public/favicon.ico",
});


module.exports = {
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
        "background_color": "#000000",
        "display": "fullscreen",
        "theme_color": "#000000"
      }
    })
  ]
}
