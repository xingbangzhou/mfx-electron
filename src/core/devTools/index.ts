import {BrowserWindow, ipcMain} from 'electron'
import {DevToolsOps} from './types'

class DevTools {
  init() {
    ipcMain.on(DevToolsOps.OpenDevTools, event => {
      const win = BrowserWindow.fromWebContents(event.sender)
      win.webContents.openDevTools({mode: 'detach'})
    })

    ipcMain.on(DevToolsOps.CloseDevTools, event => {
      const win = BrowserWindow.fromWebContents(event.sender)
      win.webContents.closeDevTools()
    })
  }
}

const devTools = new DevTools()

export default devTools
