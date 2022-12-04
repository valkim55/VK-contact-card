const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Webpack Plugin',
        })
    ],
    module: {
        rules: [
            {
                // rules for bundling images
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                // rules for bundling CSS files
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                // add babel loader
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ ['@babel/preset-env', { targets: "defaults" }] ]
                    }
                }
            }
        ]
    }
};


