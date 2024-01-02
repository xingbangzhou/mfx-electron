import {contextBridge} from 'electron'
import {
  closeDevTool,
  openDevTool,
  closeBrowserWindow,
  onWindowClosed,
  onWindowMessage,
  openBrowserWindow,
  sendMessageToWindow,
} from './core/kernel/preload'

contextBridge.exposeInMainWorld('electronMain', {
  openDevTool: openDevTool,
  closeDevTool: closeDevTool,
  openBrowserWindow: openBrowserWindow,
  closeBrowserWindow: closeBrowserWindow,
  onWindowClosed: onWindowClosed,
  onWindowMessage: onWindowMessage,
  sendMessageToWindow: sendMessageToWindow,
})
