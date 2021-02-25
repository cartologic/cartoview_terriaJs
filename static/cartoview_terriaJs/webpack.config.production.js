const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
const BUILD_DIR = path.resolve(__dirname, "dist")
const APP_DIR = path.resolve(__dirname, "src")
const filename = "[name].bundle.js"

const plugins = [
    new MiniCssExtractPlugin({}),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.SourceMapDevToolPlugin({
        filename: "sourcemaps/[file].map",
        publicPath: "/static/cartoview_terriaJs/dist/",
        fileContext: "public",
    }),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
]

const config = {
    entry: {
        CartoviewTerria: path.join(APP_DIR, "AppRender.jsx"),
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: "-",
        },
    },
    devtool: "source-map",
    mode: "production",
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
                use: "raw-loader",
            },
            {
                type: "javascript/auto",
                test: /\.json$/,
                use: "json-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: "file-loader",
            },
            {
                test: /\.(woff|woff2)$/,
                use: "url-loader?limit=100000",
            },
        ],
        noParse: [/dist\/ol\.js/, /dist\/jspdf.debug\.js/, /dist\/js\/tether\.js/],
    },
}
module.exports = config
