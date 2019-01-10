var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {

    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        filename: "./js/bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
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
                loaders: ["style-loader", "css-loader", "sass-loader"],
                test: /\.scss$/,
            },
            {
                loaders: ["svg-url-loader"],
                test: /\.svg$/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: "./public/index.html"
        })
      ]
};