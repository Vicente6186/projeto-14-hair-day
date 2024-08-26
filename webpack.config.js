const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            // minify: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src", to: "src" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                    ]
                },
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        static:'./dit',
        open: true,
        port: 5000,
        watchFiles: ['./index.html'],
    }
}