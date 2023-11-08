export {}

interface WinClosedListener {
  (event: IpcRendererEvent, windowId: number): void
}

interface WinMessageListener {
  (event: IpcRendererEvent, data: unknown, windowId?: number): void
}

declare global {
  interface PopupElectronApi {
    openDevTools: () => void
    closeDevTools: () => void
    closeWin: () => void
    sendMessageToWin: (data: unknown, windowId?: number) => void
    onWinMessage: (listener: WinMessageListener) => void
  }

  interface Window {
    popupElectronApi: PopupElectronApi
  }
}
