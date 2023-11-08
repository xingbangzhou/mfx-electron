import {IpcRendererEvent} from 'electron'

export enum BrowserWinOps {
  OpenBrowserWin = 'render:invoke:open-browserwin',
  CloseBrowserWin = 'render:invoke:close-browserwin',
  CloseWin = 'render:invoke:close-win',
  OnWinClosed = 'main:send:win-closed',
  SendMessageToWin = 'render:send:send-message-to-win',
  OnWinMessage = 'man:send:win-message',
  OpenSettgins = 'render:',
}

export interface OpenBrowserWinProps {
  url: string
  width: number
  height: number
  frame?: boolean
  fullscreen?: boolean
  fullscreenable?: boolean
  resizable?: boolean
  transparent?: boolean
}

export interface WinClosedListener {
  (event: IpcRendererEvent, windowId: number): void
}

export interface WinMessageListener {
  (event: IpcRendererEvent, data: unknown, windowId?: number): void
}
