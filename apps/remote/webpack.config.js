const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const sveltePreprocess = require('svelte-preprocess');
const { merge } = require('webpack-merge');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = async (config_0) => {
  /** @type {import("webpack").Configuration} */
  const config_1 = {
    mode,
    optimization: {
      runtimeChunk: false,
    },
    devtool: 'source-map',
    devServer: {
      hot: true,
      port: 3001,
      static: './dist',
      compress: true,
    },
    entry: './src/index.ts',
    resolve: {
      alias: {
        svelte: path.dirname(require.resolve('svelte/package.json')),
      },
      extensions: ['.mjs', '.js', '.ts', '.svelte'],
    },
    output: {
      path: path.resolve(__dirname, '../../dist/apps/remote'),
      publicPath: 'http://localhost:3001/',
      uniqueName: 'remote',
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: !prod,
              },
              emitCss: prod,
              hotReload: !prod,
              preprocess: sveltePreprocess({ sourceMap: !prod }),
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        },
        {
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new webpack.container.ModuleFederationPlugin({
        name: 'remote',
        filename: 'remote-entry.js',
        remotes: {},
        exposes: {
          './index': './src/App.svelte',
        },
        shared: {},
      }),
    ],
  };

  return merge(config_0, config_1);
};
