const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
    entry: {
        index: './index.js',
        'index.min': './index.js',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [require('babel-preset-env')],
                        plugins: [],
                    },
                },
            },
        ],
    },
    plugins: [
        new UglifyJsPlugin({
            cache: true,
            include: /\.min\.js$/,
        }),
        new webpack.BannerPlugin({
            banner: `${pkg.name} v${pkg.version} ([hash])`,
        }),
    ],
};
