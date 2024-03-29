import type {Configuration, RuleSetUseItem} from 'webpack'

import path from 'path'
import {rules} from './webpack.rules'
import {plugins} from './webpack.plugins'

// STYLE
function styleLoaders(rules: RuleSetUseItem[] = []): RuleSetUseItem[] {
  return [
    {
      loader: require.resolve('style-loader'),
      options: {},
    },
    {
      loader: require.resolve('css-loader'),
      options: {},
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          hideNothingWarning: true,
        },
      },
    },
    ...rules,
  ]
}

rules.push({
  test: /\.css$/,
  use: [...styleLoaders()],
})

rules.push({
  test: /\.(scss|sass)$/,
  use: [
    ...styleLoaders([
      {
        loader: require.resolve('sass-loader'),
        options: {
          implementation: require('sass'),
        },
      },
    ]),
  ],
})

// TSX
rules.push({
  test: /\.tsx$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      exclude: /node_modules/,
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
    },
  },
})

// PNG
rules.push({
  test: /\.(a?png|jpe?g|gif|webp|ico|bmp|avif)$/i,
  type: 'asset/resource',
  // use: [
  //   {
  //     loader: 'url-loader',
  //     options: {
  //       limit: 1,
  //       esModule: false,
  //     },
  //   },
  // ],
})

// SVG
rules.push({
  test: /\.svg$/,
  use: ['@svgr/webpack'],
})

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    alias: {
      '@main': path.resolve(__dirname, 'src/main'),
      '@settings': path.resolve(__dirname, 'src/settings'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
}
