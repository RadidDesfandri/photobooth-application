import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IElectronAPI } from './index.d'
import { ipcCameraKeys } from '../main/handlers/camera.config'

// Custom APIs for renderer
const api: IElectronAPI = {
  pingCamera: () => ipcRenderer.invoke(ipcCameraKeys.ping),
  getCameraStatus: () => ipcRenderer.invoke(ipcCameraKeys.cameraStatus),
  connectCamera: () => ipcRenderer.invoke(ipcCameraKeys.connect),
  disconnectCamera: () => ipcRenderer.invoke(ipcCameraKeys.disconnect),
  captureImage: () => ipcRenderer.invoke(ipcCameraKeys.capture),
  startLiveView: () => ipcRenderer.invoke(ipcCameraKeys.startLiveView),
  stopLiveView: () => ipcRenderer.invoke(ipcCameraKeys.stopLiveView),
  getLiveViewFrame: () => ipcRenderer.invoke(ipcCameraKeys.liveViewFrame)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
