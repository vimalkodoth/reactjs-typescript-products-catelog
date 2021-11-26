const webpackPlugin = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        open: true,
        static: '.',
    },
    plugins: [
        // new ReactRefreshWebpackPlugin(),
        new webpackPlugin.DefinePlugin({
            'process.env.name': JSON.stringify(''),
        }),
        new ReactRefreshWebpackPlugin(),
    ],
};
