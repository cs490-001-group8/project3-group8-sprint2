const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: "./scripts/Main.jsx",
    output: {
        path: __dirname,
        filename: "./static/script.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react',
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: false
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new Dotenv()
    ]
};