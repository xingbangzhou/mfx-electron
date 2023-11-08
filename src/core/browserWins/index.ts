import {BrowserWindow, ipcMain} from 'electron'
import {BrowserWinOps, OpenBrowserWinProps} from './types'
import logger from '@core/utils/logger'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string
declare const POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY: string
declare const POPUP_WINDOW_WEBPACK_ENTRY: string

const titleBarStyle: Electron.TitleBarOverlay = {
  height: 38,
  color: 'rgba(0,0,0,0)',
  symbolColor: '#898989',
}

class BrowserWins {
  init() {
    // OpenBrowserWin
    ipcMain.handle(BrowserWinOps.OpenBrowserWin, async (_event, props: OpenBrowserWinProps) => {
      const popup = this.createPopup(props)

      return {windowId: popup.id}
    })
    // CloseBrowserWin
    ipcMain.handle(BrowserWinOps.CloseBrowserWin, (event, windowId: number) => {
      logger.log('BrowserWins', 'CloseBrowserWin: ', event, windowId)

      const win = BrowserWindow.fromId(windowId)
      if (win && win !== this.mainWindow) {
        win.close()
      }
    })
    // CloseWin
    ipcMain.handle(BrowserWinOps.CloseWin, event => {
      logger.log('BrowserWins', 'CloseWin: ', event)

      const win = BrowserWindow.fromWebContents(event.sender)
      if (win) {
        win.close()
      }
    })
    // SendMessageToWin
    ipcMain.on(BrowserWinOps.SendMessageToWin, (event, data: unknown, windowId = 0) => {
      logger.log('BrowserWins', 'SendMessageToWin: ', event, data, windowId)

      let win: BrowserWindow | undefined = undefined
      if (windowId === 0) {
        win = this.mainWindow
      } else {
        win = BrowserWindow.fromId(windowId)
      }
      if (!win) return

      const fromWin = BrowserWindow.fromWebContents(event.sender)
      win.webContents.send(BrowserWinOps.OnWinMessage, data, fromWin?.id)
    })
  }

  private mainWindow: BrowserWindow

  createMainWindow() {
    const minWidth = 960
    const minHeight = 640
    const mainWindow = new BrowserWindow({
      width: minWidth,
      height: minHeight,
      show: false,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        webSecurity: false,
      },
      titleBarStyle: 'hidden',
      titleBarOverlay: titleBarStyle,
    })
    this.mainWindow = mainWindow

    mainWindow.setMinimumSize(minWidth, minHeight)

    logger.log('BrowserWins', 'createMainWindow: ', mainWindow.id)

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })
  }

  openSettings() {
    this.createPopup({
      url: POPUP_WINDOW_WEBPACK_ENTRY,
      width: 670,
      height: 467,
    })
  }

  private createPopup(props: OpenBrowserWinProps) {
    const popup = new BrowserWindow({
      parent: this.mainWindow,
      width: props.width,
      height: props.height,
      show: false,
      frame: false,
      transparent: true,
      webPreferences: {
        preload: POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY,
        webSecurity: false,
      },
    })
    logger.log('BrowserWins', 'createPopup: ', props, popup.id)

    popup.loadURL(props.url)
    popup.once('ready-to-show', () => {
      popup.show()
    })

    // OnWinClosed
    const winId = popup.id
    popup.on('closed', () => {
      logger.log('BrowserWins', 'popup, closed: ', winId)

      this.mainWindow.webContents.send(BrowserWinOps.OnWinClosed, winId)
    })

    return popup
  }
}

const browserWins = new BrowserWins()

export default browserWins
