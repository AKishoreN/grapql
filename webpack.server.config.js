const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    devtool: 'eval',
    //End point
    //At here you can import module, you can defined more start point.
    entry: './app.js',
    //We build for node env

    externals: fs.readdirSync("node_modules")
        .reduce(function(acc, mod) {
            if (mod === ".bin") {
                return acc
            }

            acc[mod] = "commonjs " + mod
            return acc
        }, {}),

    //This i set it for backend - you can choose for web :web
    target: 'node',

    //Real app
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: true,
        __dirname: true
    },

    //Out put file in the build/ folder
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'backend.js',
    },

    resolve: {
        extensions: [
            "",
            ".js",
            ".json"
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ],

    //This config loaders for each type.
    module: {
        loaders: [
            //Use babel -> build and validate JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }, {
                test: /\.json?$/,
                loader: 'json'
            }
        ]
    }
}
