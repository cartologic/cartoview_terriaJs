const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const BUILD_DIR = path.resolve(__dirname, "dist")
const APP_DIR = path.resolve(__dirname, "src")
const filename = "[name].bundle.js"

const plugins = [
    new MiniCssExtractPlugin({}),
    new webpack.SourceMapDevToolPlugin({
        filename: "sourcemaps/[file].map",
        publicPath: "/static/cartoview_terriaJs/dist/",
        fileContext: "public",
    })
]

const config = {
    entry: {
        CartoviewTerria: path.join(APP_DIR, "index.js"),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: "-",
        },
    },
    devtool: "eval-cheap-module-source-map",
    output: {
        path: BUILD_DIR,
        filename: filename,
        library: "[name]",
        libraryTarget: "umd",
        umdNamedDefine: true,
        chunkFilename: "[name]-chunk.js",
        publicPath: "/static/cartoview_terriaJs/dist/",
    },
    node: {
        fs: "empty",
    },
    plugins: plugins,
    resolve: {
        extensions: ["*", ".js", ".jsx"],
        alias: {
            Source: APP_DIR,
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["es2015", "stage-1", "react"],
                        plugins: ["transform-object-rest-spread", "transform-runtime"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.xml$/,
                loader: "raw-loader",
            },
            {
                type: "javascript/auto",
                test: /\.json$/,
                loader: "json-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "file-loader",
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?limit=100000",
            },
        ],
        noParse: [/dist\/ol\.js/, /dist\/jspdf.debug\.js/, /dist\/js\/tether\.js/],
    },
}

module.exports = config
