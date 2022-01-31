import { app, BrowserWindow, ipcMain, session } from "electron";
import { resolve } from "path";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 700,
    webPreferences: {
      preload: resolve(app.getAppPath(), "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.setMenu(null);

  const userAgent = mainWindow.webContents.getUserAgent();
  mainWindow.loadURL("http://localhost:3001", {
    userAgent: userAgent.replace(/electron\/[\d\.]+/i, ""),
  });
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  ipcMain.on("foundry-client-open", (url) => {
    mainWindow.loadURL(url, {
      userAgent: userAgent.replace(/electron\/[\d\.]+/i, ""),
    });
  });

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
