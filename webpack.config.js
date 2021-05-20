const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = {
  // mode: "development",
  mode: "production",

  entry: {
    index: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle_[name].js",
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "main.css"),
          to: path.resolve(__dirname, "dist", "css/main.css"),
        },
        {
          from: path.resolve(__dirname, "src", "GCWeb"),
          to: path.resolve(__dirname, "dist", "GCWeb"),
        },
        {
          from: path.resolve(__dirname, "src", "wet-boew"),
          to: path.resolve(__dirname, "dist", "wet-boew"),
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: false,
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  resolve: {
    extensions: ["*", ".js"],
  },

  devServer: {
    compress: true,
    contentBase: "./dist",
    publicPath: "/",
    hot: true,
  },

  devtool: false,

  optimization: {
    minimize: true,
    usedExports: true,
    // splitChunks: {
    //   cacheGroups: {
    //     highchartsVendor: {
    //       test: /[\\/]node_modules[\\/](highcharts)[\\/]/,
    //       chunks: "initial",
    //       reuseExistingChunk: true,
    //       enforce: true,
    //       filename: "vendor/highcharts.[contenthash].js",
    //     },
    //   },
    // },
  },
};
