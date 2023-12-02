import webpack, {type Configuration} from 'webpack'
import path from 'path'
import {rules} from './webpack.rules'

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.EnvironmentPlugin(
      {FLUENTFFMPEG_COV: false}),
  ],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'src/core'),
    },
    extensions: ['.js', '.ts', '.json'],
  },
  externals: [
    { '@ffmpeg-installer/ffmpeg': { commonjs: '@ffmpeg-installer/ffmpeg' } }
  ],
  output: {
    libraryTarget: 'commonjs',
  }
}
