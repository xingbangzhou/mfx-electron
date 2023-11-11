import {contextBridge} from 'electron'
import {closeDevTools, openDevTools} from './core/devTools/preload'
import {
  closeBrowserWin,
  onWinClosed,
  onWinMessage,
  openBrowserWin,
  openSettings,
  sendMessageToWin,
} from './core/browserWins/preload'

contextBridge.exposeInMainWorld('mainElectronApi', {
  openDevTools: openDevTools,
  closeDevTools: closeDevTools,
  openBrowserWin: openBrowserWin,
  closeBrowserWin: closeBrowserWin,
  onWinClosed: onWinClosed,
  sendMessageToWin: sendMessageToWin,
  onWinMessage: onWinMessage,
  openSettings: openSettings,
})
