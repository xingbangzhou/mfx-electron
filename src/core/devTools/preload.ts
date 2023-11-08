import {ipcRenderer} from 'electron'
import {DevToolsOps} from './types'

export const openDevTools = () => {
  ipcRenderer.send(DevToolsOps.OpenDevTools)
}

export const closeDevTools = () => {
  ipcRenderer.send(DevToolsOps.CloseDevTools)
}
