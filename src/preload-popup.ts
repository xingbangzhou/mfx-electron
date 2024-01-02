import {contextBridge} from 'electron'
import {closeDevTool, openDevTool, close, onWindowMessage, sendMessageToWindow} from './core/kernel/preload'

contextBridge.exposeInMainWorld('electronPopup', {
  openDevTool: openDevTool,
  closeDevTool: closeDevTool,
  close: close,
  sendMessageToWindow: sendMessageToWindow,
  onWindowMessage: onWindowMessage,
})
