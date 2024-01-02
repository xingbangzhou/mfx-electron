export {}

interface WindowMessageListener {
  (event: IpcRendererEvent, data: unknown, windowId?: number): void
}

declare global {
  interface ElectronPopup {
    openDevTool: () => void
    closeDevTool: () => void
    close: () => void
    sendMessageToWindow: (data: unknown, windowId?: number) => void
    onWindowMessage: (listener: WinMessageListener) => void
  }

  interface Window {
    electronPopup: ElectronPopup
  }
}
