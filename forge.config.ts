import type {ForgeConfig} from '@electron-forge/shared-types'
import {MakerSquirrel} from '@electron-forge/maker-squirrel'
import {MakerZIP} from '@electron-forge/maker-zip'
import {MakerDeb} from '@electron-forge/maker-deb'
import {MakerRpm} from '@electron-forge/maker-rpm'
import {AutoUnpackNativesPlugin} from '@electron-forge/plugin-auto-unpack-natives'
import {WebpackPlugin} from '@electron-forge/plugin-webpack'

import {mainConfig} from './webpack.main.config'
import {rendererConfig} from './webpack.renderer.config'

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          // MainWindow
          {
            name: 'main_window',
            html: './src/index.html',
            js: './src/bootstrap-main.ts',
            preload: {
              js: './src/preload-main.ts',
            },
          },
          // SettingsWindow
          {
            name: 'settings_window',
            html: './src/index.html',
            js: './src/bootstrap-settings.ts',
            preload: {
              js: './src/preload-popup.ts',
            },
          },
        ],
      },
    }),
  ],
}

export default config
