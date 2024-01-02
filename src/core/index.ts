import {BrowserWindow, app} from 'electron'
import mainFrame from './kernel/mainFrame'
import devTool from './kernel/devTool'

class MainRunner {
  run() {
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
    mainFrame.init()
    devTool.init()

    // 创建主窗口
    mainFrame.createMainWindow()
  }
}

const mainRunner = new MainRunner()

export default mainRunner
