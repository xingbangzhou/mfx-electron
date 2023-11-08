import {ipcRenderer} from 'electron'
import {OpenBrowserWinProps, BrowserWinOps, WinClosedListener, WinMessageListener} from './types'

export const openBrowserWin = async (props: OpenBrowserWinProps) => {
  const result = await ipcRenderer.invoke(BrowserWinOps.OpenBrowserWin, props)

  return result as {windowId: number} | undefined
}

export const closeBrowserWin = (windowId: number) => {
  ipcRenderer.invoke(BrowserWinOps.CloseBrowserWin, windowId)
}

export const closeWin = () => {
  ipcRenderer.invoke(BrowserWinOps.CloseWin)
}

export const onWinClosed = (listener: WinClosedListener) => {
  ipcRenderer.on(BrowserWinOps.OnWinClosed, listener)
}

export const sendMessageToWin = (data: unknown, windowId = 0) => {
  ipcRenderer.send(BrowserWinOps.SendMessageToWin, data, windowId)
}

export const onWinMessage = (listener: WinMessageListener) => {
  ipcRenderer.on(BrowserWinOps.OnWinMessage, listener)
}
