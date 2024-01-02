export {}

interface OpenBrowserWindowProps {
  url: string
  width: number
  height: number
  frame?: boolean
  fullscreen?: boolean
  fullscreenable?: boolean
  resizable?: boolean
  transparent?: boolean
  useSystemTitleBar?: boolean
  maximizable?: boolean
}

interface WindowClosedListener {
  (event: IpcRendererEvent, windowId: number): void
}

interface WindowMessageListener {
  (event: IpcRendererEvent, data: unknown, windowId?: number): void
}

declare global {
  interface ElectronMain {
    openDevTool: () => void
    closeDevTool: () => void
    openBrowserWindow: (props: OpenBrowserWinProps) => Promise<{windowId: number} | undefined>
    closeBrowserWindow: (windowId: number) => void
    onWindowClosed: (listener: WindowClosedListener) => void
    onWindowMessage: (listener: WindowMessageListener) => void
    sendMessageToWindow: (data: unknown, windowId?: number) => void
  }

  interface Window {
    electronMain: ElectronMain
  }
}
