import type {IpcRendererEvent} from 'electron'

export enum BrowserWindowInvokeID {
  OpenBrowserWindow = 'render:invoke:open-browserwindow',
  CloseBrowserWindow = 'render:invoke:close-browserwindow',
  Close = 'render:invoke:close',
}

export enum BrowserWdinowEventID {
  WindowClosed = 'main:send:window-close',
  SendMessageToWindow = 'render:send:send-message-to-window',
  WindowMessage = 'main:send:window-message',
  OpenDevTool = 'render:send:open-devtool',
  CloseDevTool = 'render:send:close-devtool',
}

export interface OpenBrowserWindowProps {
  url: string
  width: number
  height: number
  frame?: boolean
  fullscreen?: boolean
  fullscreenable?: boolean
  resizable?: boolean
  transparent?: boolean
  useSystemTitleBar?: boolean
  maximizable?: boolean
}

export interface WindowClosedListener {
  (event: IpcRendererEvent, windowId: number): void
}

export interface WindowMessageListener {
  (event: IpcRendererEvent, data: unknown, windowId?: number): void
}
