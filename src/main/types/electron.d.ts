export {};

declare global {
  interface ElectronMain {
    openDevTools: (visible: boolean) => void;
    openBrowserWindow: (props: {
      url: string;
      width: number;
      height: number;
    }) => Promise<{ windowId: number } | undefined>;
    closeBrowserWindow: (windowId: number) => void;
    onWindowClosed: (handle: (windowId: number) => void) => void;
  }

  interface Window {
    electronMain: ElectronMain;
  }
}
