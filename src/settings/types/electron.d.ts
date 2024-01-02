export {}

interface WindowMessageListener {
  (event: any, data: unknown, windowId?: number): void
}

declare global {
  interface ElectronPopup {
    openDevTool: () => void
    closeDevTool: () => void
    close: () => void
    sendMessageToWindow: (data: unknown, windowId?: number) => void
    onWindowMessage: (listener: WindowMessageListener) => void
  }

  interface Window {
    electronPopup?: ElectronPopup
  }
}
