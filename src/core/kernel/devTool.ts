import {BrowserWindow, ipcMain} from 'electron'
import {BrowserWdinowEventID} from './types'

class DevTool {
  init() {
    ipcMain.on(BrowserWdinowEventID.OpenDevTool, event => {
      const win = BrowserWindow.fromWebContents(event.sender)
      win.webContents.openDevTools({mode: 'detach'})
    })

    ipcMain.on(BrowserWdinowEventID.CloseDevTool, event => {
      const win = BrowserWindow.fromWebContents(event.sender)
      win.webContents.closeDevTools()
    })
  }
}

const devTool = new DevTool()

export default devTool
