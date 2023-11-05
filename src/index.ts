import { app, BrowserWindow, ipcMain } from "electron";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow;

const createMainWindow = (): void => {
  setupEnv();

  // Create the browser window.
  const minWidth = 960
  const minHeight = 640
  mainWindow = new BrowserWindow({
    width: minWidth,
    height: minHeight,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false,
    },
    titleBarStyle: "hidden",
    titleBarOverlay: {
      height: 38,
      color: "rgba(0,0,0,0)",
      symbolColor: "#898989"
    }
  });

  mainWindow.setMinimumSize(minWidth, minHeight)

  console.log(
    "Electron[Main]",
    "createMainWindow: ",
    mainWindow.id
  );

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createMainWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

const createPopup = (props: { url: string; width: number; height: number }) => {
  const popup = new BrowserWindow({
    parent: mainWindow,
    width: props.width,
    height: props.height,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webSecurity: false,
    },
  });
  console.log(
    "Electron[Main]",
    "createPopup: ",
    props,
    popup.id
  );

  popup.loadURL(props.url);

  popup.once("ready-to-show", () => {
    popup.show();
  });

  // 监听弹窗关闭
  const popupId = popup.id;
  popup.on("closed", () => {
    console.log("Electron[Main]", "popup, closed: ", popupId);

    mainWindow.webContents.send("on:window-closed", popupId);
  });

  return popup;
};

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const setupEnv = () => {
  console.log(
    "Electron[Main]",
    "setupEnv: ",
    MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    POPUP_WINDOW_PRELOAD_WEBPACK_ENTRY
  );

  onDevTools();
  handlePopup();
};

const onDevTools = () => {
  // send:open-devtools
  ipcMain.on("send:open-devtools", (event, value) => {
    console.log(
      "Electron[Main]",
      "send:open-devtools: ",
      value,
      JSON.stringify(event.sender)
    );

    const win = BrowserWindow.fromWebContents(event.sender);
    if (value) {
      win.webContents.openDevTools({ mode: "undocked" });
    } else {
      win.webContents.closeDevTools();
    }
  });
};

const handlePopup = () => {
  // invoke:open-browserwindow
  ipcMain.handle(
    "invoke:open-browserwindow",
    async (event, props: { url: string; width: number; height: number }) => {
      console.log(
        "Electron[Main]",
        "invoke:open-browserwindow: ",
        event,
        props
      );

      const popup = createPopup(props);

      return { windowId: popup.id };
    }
  );
  // invoke:close-browserwindow
  ipcMain.handle("invoke:close-browserwindow", (event, windowId) => {
    console.log(
      "Electron[Main]",
      "invoke:open-browserwindow: ",
      event,
      windowId
    );

    const win = BrowserWindow.getAllWindows().find((el) => el.id === windowId);
    if (win) {
      win.close();
    }
  });
  // invoke:close-window
  ipcMain.handle("invoke:close-window", (event) => {
    console.log("Electron[Main]", "invoke:close-window: ", event);

    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      win.close();
    }
  });
};
