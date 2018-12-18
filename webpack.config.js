const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const mode = (process.env.NODE_ENV)?"production":"development";

module.exports = {
    mode: mode,
    node:{
        fs:'empty'
    },
    output: {
        filename: 'bundle.min.js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({test: /\.js(\?.*)?$/i})]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [["@babel/preset-env"]],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
              }
        ]
    }
};