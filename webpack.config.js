const ph = require("path");

const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = (env, argv) => {
    let workEnv = argv.mode;

    return {
        target: "node",
        mode: workEnv,
        context: __dirname,
        entry: {
            "index": "./src/index.ts"
        },
        output: {
            filename: "[name].js",
            path: ph.resolve(__dirname, "dist"),
            libraryTarget: 'commonjs2'
        },
        externals: {},
        resolve: {
            extensions: [".js", ".ts"]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader!ts-loader'
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
        ]
    }
};