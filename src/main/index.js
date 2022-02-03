import { app, BrowserWindow, session } from "electron";
import { resolve } from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: resolve(app.getAppPath(), "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.webContents.userAgent = mainWindow.webContents.userAgent.replace(
    /electron\/[\d\.]+/i,
    "custom-foundry-client/0.0.0"
  );

  mainWindow.loadURL("https://vtt.n1xx1.me/");
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
