import {ipcRenderer} from 'electron'
import {
  BrowserWdinowEventID,
  BrowserWindowInvokeID,
  OpenBrowserWindowProps,
  WindowClosedListener,
  WindowMessageListener,
} from './types'

// BrowserWindowInvokeID
export const openBrowserWindow = async (props: OpenBrowserWindowProps) => {
  const result = await ipcRenderer.invoke(BrowserWindowInvokeID.OpenBrowserWindow, props)

  return result as {windowId: number} | undefined
}

export const closeBrowserWindow = (windowId: number) => {
  ipcRenderer.invoke(BrowserWindowInvokeID.CloseBrowserWindow, windowId)
}

export const close = () => {
  ipcRenderer.invoke(BrowserWindowInvokeID.Close)
}

// BrowserWdinowEventID

export const onWindowClosed = (listener: WindowClosedListener) => {
  ipcRenderer.on(BrowserWdinowEventID.WindowClosed, listener)
}

export const sendMessageToWindow = (data: unknown, windowId = 0) => {
  ipcRenderer.send(BrowserWdinowEventID.SendMessageToWindow, data, windowId)
}

export const onWindowMessage = (listener: WindowMessageListener) => {
  ipcRenderer.on(BrowserWdinowEventID.WindowMessage, listener)
}

// DevTool
export const openDevTool = () => {
  ipcRenderer.send(BrowserWdinowEventID.OpenDevTool)
}

export const closeDevTool = () => {
  ipcRenderer.send(BrowserWdinowEventID.CloseDevTool)
}
