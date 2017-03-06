var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var AssetsPlugin = require('assets-webpack-plugin');
var path = require("path");
var umdREquirePlugin = require("umd-require-webpack-plugin");
var MoveToParentMergingPlugin = require('move-to-parent-merging-webpack-plugin');
var hotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");
var autoprefixer = require('autoprefixer');


module.exports = {
    // The standard entry point and output config
    entry: {
        "index": "./src/js/index"
    },
    output: {
        path: path.join("assets"),//path.join(__dirname, "assets", "[hash]"),
        publicPath: "/static/",
        filename: "[name].js",
        chunkFilename: "bundle-[id].js"
    },
/*
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
*/
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader","autoprefixer-loader")
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
              test:/\.(sass|scss)$/,
                loader:ExtractTextPlugin.extract("style-loader",
                    "css-loader?-autoprefixer!autoprefixer-loader!postcss-loader!sass-loader")
            },
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10000&name=build/[name].[ext]'
            },
            {
                test: /\.vue$/, 
                 loader: 'vue'   
            },
            {
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            }
        ]
    },

    postcss:[autoprefixer({browsers:['last 2 versions']})],

    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("[name].css"),
        /*new CommonsChunkPlugin({
            name: "common-app.chunk", 
            chunks: ["app-init", "home", "features", "collect","pricing"]
        }),*/

        //new CommonsChunkPlugin("search-app.chunk.js", ["search-app", "home", "listing-detail"]),
        //new AssetsPlugin({filename: './version-control/source-map.json', prettyPrint: true}),
        new MoveToParentMergingPlugin(),
        new umdREquirePlugin(),
        new hotModuleReplacementPlugin()
    ],

    resolve: {
        modulesDirectories: ['.', 'node_modules']
    },

    resolveLoader: {
        modulesDirectories: ['.', 'node_modules']
    },
};
