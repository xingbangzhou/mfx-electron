import { contextBridge, ipcRenderer } from 'electron'

const openDevTools = (visible: boolean) => ipcRenderer.send("send:open-devtools", visible)

const openBrowserWindow = async (props: {url: string, width: number, height: number}) => {
  const result = await ipcRenderer.invoke("invoke:open-browserwindow", props)

  return result as {windowId: number} | undefined
}

const closeBrowserWindow = (windowId: number) => {
  ipcRenderer.invoke("invoke:close-browserwindow", windowId)
}

const onWindowClosed = (handle: (windowId: number) => void) => {
  ipcRenderer.on("on:window-closed", (event, windowId: number) => {
    handle(windowId)
  })
}

contextBridge.exposeInMainWorld("electronMain", {
    openDevTools,
    openBrowserWindow,
    closeBrowserWindow,
    onWindowClosed
})