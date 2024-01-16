import logger from '@core/utils/logger'
import {BrowserWindow, ipcMain, globalShortcut} from 'electron'
import {BrowserWdinowEventID, BrowserWindowInvokeID, OpenBrowserWindowProps} from './types'

// main_window
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string
// settings_window
declare const SETTINGS_WINDOW_WEBPACK_ENTRY: string
declare const SETTINGS_WINDOW_PRELOAD_WEBPACK_ENTRY: string

class MainFrame {
  constructor() {}

  private mainWindow: BrowserWindow

  init() {
    this.initInvokes()
    this.initEvents()
  }

  // 创建主窗口
  createMainWindow() {
    const minWidth = 960
    const minHeight = 640
    const mainWindow = (this.mainWindow = new BrowserWindow({
      width: minWidth,
      height: minHeight,
      show: false,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        webSecurity: false,
      },
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        height: 48,
        color: 'rgba(0,0,0,0)',
        symbolColor: '#898989',
      },
    }))
    logger.log('MainFrame', 'createMainWindow: ', mainWindow.id)

    mainWindow.setMinimumSize(minWidth, minHeight)

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })

    mainWindow.on('closed', () => {
      logger.log('MainFrame', 'mianwindow, closed!')
      this.mainWindow = undefined
    })

    // 键盘
    globalShortcut.register('F11', () => {
      BrowserWindow.getFocusedWindow()?.webContents.openDevTools({mode: 'detach'})
    })
  }

  // 创建窗口
  createWindow(props: OpenBrowserWindowProps) {
    // 路径
    let url = props.url
    if (url === 'settings') {
      url = SETTINGS_WINDOW_WEBPACK_ENTRY
    }
    // BrowserWindow
    const browserWindow = new BrowserWindow({
      parent: this.mainWindow,
      width: props.width,
      height: props.height,
      show: false,
      frame: props.frame,
      fullscreen: props.fullscreen,
      fullscreenable: props.fullscreenable,
      resizable: props.resizable,
      transparent: props.transparent,
      webPreferences: {
        preload: SETTINGS_WINDOW_PRELOAD_WEBPACK_ENTRY,
        webSecurity: false,
      },
      ...(props.useSystemTitleBar
        ? {
            titleBarStyle: 'hidden',
            titleBarOverlay: {
              height: 38,
              color: 'rgba(0,0,0,0)',
              symbolColor: '#898989',
            },
            minimizable: false,
            maximizable: false,
          }
        : undefined),
    })
    logger.log('MainFrame', 'createWindow: ', props, browserWindow.id)

    browserWindow.loadURL(url)
    browserWindow.once('ready-to-show', () => {
      browserWindow.show()
    })

    const winId = browserWindow.id
    browserWindow.on('close', () => {
      logger.log('MainFrame', 'window, close: ', winId)

      this.mainWindow?.webContents?.send(BrowserWdinowEventID.WindowClosed, winId)
    })

    return browserWindow
  }

  private initInvokes() {
    ipcMain.handle(BrowserWindowInvokeID.OpenBrowserWindow, async (event, props: OpenBrowserWindowProps) => {
      logger.log('MainFrame', 'OpenBrowserWindow: ', props)
      const browserWindow = this.createWindow(props)

      return {windowId: browserWindow.id}
    })

    ipcMain.handle(BrowserWindowInvokeID.CloseBrowserWindow, async (event, windowId: number) => {
      logger.log('MainFrame', 'CloseBrowserWindow: ', windowId)

      const browserWindow = BrowserWindow.fromId(windowId)
      if (browserWindow && browserWindow !== this.mainWindow) {
        browserWindow.close()
      }
    })

    ipcMain.handle(BrowserWindowInvokeID.Close, event => {
      logger.log('MainFrame', 'Close: ', event)

      const win = BrowserWindow.fromWebContents(event.sender)
      if (win) {
        win.close()
      }
    })
  }

  private initEvents() {
    ipcMain.on(BrowserWdinowEventID.SendMessageToWindow, (event, data: unknown, windowId = 0) => {
      logger.log('MainFrame', 'SendMessageToWindow: ', data, windowId)

      let toWin: BrowserWindow | undefined = undefined
      if (windowId === 0) {
        toWin = this.mainWindow
      } else {
        toWin = BrowserWindow.fromId(windowId)
      }
      if (!toWin) return

      const fromWin = BrowserWindow.fromWebContents(event.sender)

      toWin.webContents.send(BrowserWdinowEventID.WindowMessage, data, fromWin?.id)
    })
  }
}

const mainFrame = new MainFrame()

export default mainFrame
