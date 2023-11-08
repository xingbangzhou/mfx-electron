export {}

interface OpenBrowserWinProps {
  url: string
  width: number
  height: number
  frameless?: boolean
  transparent?: boolean
}

interface WinClosedListener {
  (event: IpcRendererEvent, windowId: number): void
}

interface WinMessageListener {
  (event: IpcRendererEvent, data: unknown, windowId?: number): void
}

declare global {
  interface MainElectronApi {
    openDevTools: () => void
    closeDevTools: () => void
    openBrowserWin: (props: OpenBrowserWinProps) => Promise<{windowId: number} | undefined>
    closeBrowserWin: (windowId: number) => void
    onWinClosed: (listener: WinClosedListener) => void
    sendMessageToWin: (data: unknown, windowId?: number) => void
    onWinMessage: (listener: WinMessageListener) => void
  }

  interface Window {
    mainElectronApi: MainElectronApi
  }
}
