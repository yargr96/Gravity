const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    mode: 'development',

    entry: './src/index.ts',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },

        extensions: ['.ts', '.tsx', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin(),
    ],
};
