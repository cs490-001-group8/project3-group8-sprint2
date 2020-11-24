const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    entry: './scripts/Main.jsx',
    output: {
        path: __dirname,
        filename: './static/script.js',
        assetModuleFilename: 'static/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react',
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: false,
                                },
                            },
                        ],
                    ],
                },
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            assets: path.resolve('./assets'), // Makes it easier to reference our assets in jsx files
        },
    },
    plugins: [
        new Dotenv(),
    ],
};
