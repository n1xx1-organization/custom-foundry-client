import { contextBridge, ipcRenderer, webFrame } from "electron";
import foundryScript from "./foundry-script.raw.js";

contextBridge.exposeInMainWorld("foundryClient", {
  open(url) {
    ipcRenderer.send("foundry-client-open", url);
  },
});

webFrame.executeJavaScript(foundryScript);
