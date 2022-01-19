const path = require("path")
const webpack = require("webpack")

module.exports = {
    entry: "./src/index.js",
    optimization: {
        minimize: true,
    },
    target: "webworker",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "bin"),
        libraryTarget: "this",
    },
    module: {
        // Asset modules are modules that allow the use asset files (fonts, icons, etc)
        // without additional configuration or dependencies.
        rules: [
            // asset/source exports the source code of the asset.
            // Usage: e.g., import notFoundPage from "./page_404.html"
            {
                test: /\.(txt|html)/,
                type: "asset/source",
            },
        ],
    },
    plugins: [
        // Polyfills go here.
        // Used for, e.g., any cross-platform WHATWG,
        // or core nodejs modules needed for your application.
        new webpack.ProvidePlugin({
            URL: "core-js/web/url",
        }),
        new webpack.ProvidePlugin({
            Buffer: [require.resolve("buffer/"), "Buffer"],
        }),
    ],
    resolve: {
        extensions: [".web.js", ".web.ts", ".js", ".ts", ".json"],
        fallback: {
            path: require.resolve("path-browserify"),
            url: require.resolve("url"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
        },
    },
}
