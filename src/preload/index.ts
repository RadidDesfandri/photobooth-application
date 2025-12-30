import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IElectronAPI } from './index.d'
import { ipcCameraKeys } from '../main/handlers/camera.config'

// Custom APIs for renderer
const api: IElectronAPI = {
  pingCamera: () => ipcRenderer.invoke(ipcCameraKeys.ping),
  getCameraStatus: (sessionId: string) => ipcRenderer.invoke(ipcCameraKeys.cameraStatus, sessionId),
  connectCamera: (sessionId: string) => ipcRenderer.invoke(ipcCameraKeys.connect, sessionId),
  disconnectCamera: (sessionId: string) => ipcRenderer.invoke(ipcCameraKeys.disconnect, sessionId),
  captureImage: (sessionId: string) => ipcRenderer.invoke(ipcCameraKeys.capture, sessionId),
  startLiveView: (sessionId: string) => ipcRenderer.invoke(ipcCameraKeys.startLiveView, sessionId),
  stopLiveView: (sessionId: string) => ipcRenderer.invoke(ipcCameraKeys.stopLiveView, sessionId),
  // prettier-ignore
  getLiveViewFrame: (sessionId: string) => ipcRenderer.invoke(ipcCameraKeys.liveViewFrame, sessionId)
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
