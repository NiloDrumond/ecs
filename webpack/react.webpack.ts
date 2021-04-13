/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname, "..");

const config = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
    alias: {
      "@": path.resolve(rootPath, "app/src"),
      "@ecs": path.resolve(rootPath, "app/src/modules/ecs"),
      "@shared": path.resolve(rootPath, "app/src/modules/shared"),
      "@render": path.resolve(rootPath, "app/src/modules/render"),
      "@services": path.resolve(rootPath, "app/src/services"),
      "@utils": path.resolve(rootPath, "app/src/utils"),
      "@scenes": path.resolve(rootPath, "app/src/scenes"),
      "@hooks": path.resolve(rootPath, "app/src/hooks"),
      "@components": path.resolve(rootPath, "app/src/components"),
    },
  },
  entry: path.resolve(rootPath, "app/src", "index.tsx"),
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: { onlyCompileBundledFiles: true },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: path.join(rootPath, "dist/renderer"),
    dev: {
      publicPath: "/",
    },
    port: 4000,
    historyApiFallback: true,
    compress: true,
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
    publicPath: "./",
  },
  plugins: [new HtmlWebpackPlugin()],
};

export default config;
