import { contextBridge, webFrame } from "electron";
import foundryScript from "./foundry-script.raw.js";

contextBridge.exposeInMainWorld("foundryClient", {});

webFrame.executeJavaScript(foundryScript);
