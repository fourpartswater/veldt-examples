const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'assets/js/main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    compact: true,
                    presets: [ 'es2015' ]
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'resolve-url-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ExtractTextPlugin({
            filename: 'assets/styles/main.css'
        }),
        new CopyWebpackPlugin([{
            context: '../assets/images',
            from: '**/*',
            to: 'assets/images'
        }]),
        new CopyWebpackPlugin([{
            context: '../assets/favicons',
            from: '**/*',
            to: 'assets/favicons'
        }])
    ]
};
