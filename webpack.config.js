const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  console.log("process.env.foo", env);
  const production = env.production;

  return {
    entry: {
      main: "./src/scripts/index.js",
    },
    output: {
      filename: production
        ? "scripts/[contenthash].[name].js"
        : "scripts/[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    devServer: {
      static: path.resolve(__dirname, "./dist"),
      compress: true,
      port: 8080,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            production ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: { importLoaders: 1 },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "images/[hash][ext][query]",
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: production
          ? "styles/[contenthash].[name].css"
          : "styles/[name].css",
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new CleanWebpackPlugin(),
    ],

    devtool: production ? false : "eval-source-map",
  };
};
