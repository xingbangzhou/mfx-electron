import {contextBridge} from 'electron'
import {closeDevTools, openDevTools} from './core/devTools/preload'
import {closeWin, onWinMessage, sendMessageToWin} from './core/browserWins/preload'

contextBridge.exposeInMainWorld('popupElectronApi', {
  openDevTools: openDevTools,
  closeDevTools: closeDevTools,
  closeWin: closeWin,
  sendMessageToWin: sendMessageToWin,
  onWinMessage: onWinMessage,
})
