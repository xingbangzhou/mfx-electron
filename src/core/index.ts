import {BrowserWindow, app} from 'electron'
import browserWins from './browserWins'
import devTools from './devTools'

class ElectronMxCore {
  setup() {
    if (require('electron-squirrel-startup')) {
      app.quit()
    }

    app.on('ready', this.init)

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.init()
      }
    })
  }

  private init = () => {
    browserWins.init()
    devTools.init()
    browserWins.createMainWindow()
  }
}

const electronMxCore = new ElectronMxCore()

export default electronMxCore
