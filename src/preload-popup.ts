import { contextBridge, ipcRenderer } from 'electron'

const openDevTools = (visible: boolean) => ipcRenderer.send("send:open-devtools", visible)

const closeWindow = () => {
  ipcRenderer.invoke("invoke:close-window")
}

contextBridge.exposeInMainWorld("electronPopup", {
  openDevTools,
  closeWindow
})