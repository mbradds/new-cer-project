import path from "path";
import { fileURLToPath } from "url";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
      template: "./src/components/index.hbs",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.[contenthash].css",
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
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        sideEffects: true,
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { url: false } },
        ],
        sideEffects: true,
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          precompileOptions: {
            noEscape: true,
            strict: true,
            knownHelpersOnly: false,
          },
          runtime: path.resolve(__dirname, "src/components/helpers.cjs"),
          // knownHelpersOnly: false,
        },
      },
    ],
  },

  resolve: {
    extensions: ["*", ".js"],
  },

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
