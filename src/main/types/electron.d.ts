export {}

export interface OpenBrowserWindowProps {
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
  // 指定唯一key
  key?: string
}

export interface WindowClosedListener {
  (event: any, windowId: number): void
}

export interface WindowMessageListener {
  (event: any, data: unknown, windowId?: number): void
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
