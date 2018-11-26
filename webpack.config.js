var DojoWebpackPlugin = require("dojo-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var path = require("path");
var webpack = require("webpack");

module.exports = {
    context: __dirname,
    devtool: "cheap-module-eval-source-map",
    entry: path.resolve(__dirname, 'src/bootstrap.js'),
    output: {
        path: path.resolve(__dirname, "release"),
        //publicPath: "release/",
        //pathinfo: true,
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.(png)|(gif)$/,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: 100000
                    }
                }
            ]
        }]
    },
    plugins: [
        new DojoWebpackPlugin({
            loaderConfig: require("./src/loaderConfig"),
            environment: { dojoRoot: "release" },
            buildEnvironment: {dojoRoot: "node_modules"},
            locales: ["zh-cn"],
            noConsole: true
        }),
        new CopyWebpackPlugin([{
            context: "node_modules",
            from: "dojo/resources/blank.gif",
            to: "dojo/resources"
        }]),
        new webpack.NormalModuleReplacementPlugin(/^dojox\/gfx\/renderer!/, "dojox/gfx/canvas"),
        new webpack.NormalModuleReplacementPlugin(
            /^css!/, function(data) {
                data.request = data.request.replace(/^css!/, "!style-loader!css-loader!less-loader!")
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            inject: true
        })
    ],
    resolveLoader: {
        modules: ["node_modules"]
    },
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

    /*optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    mangle: true,
                    output: {comments:false}
                },
                sourceMap: true
            })
        ]
    },
    devtool: "#source-map"*/
};
