import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiResponse } from 'src/types/api.type'
import type {
  CameraStatus,
  CaptureCamera,
  ConnectCamera,
  DisconnectCamera,
  LiveViewAction,
  LiveViewFrame,
  PingCamera
} from 'src/types/camera.type'

export interface IElectronAPI {
  pingCamera: () => Promise<ApiResponse<PingCamera>>
  getCameraStatus: () => Promise<ApiResponse<CameraStatus>>
  connectCamera: () => Promise<ApiResponse<ConnectCamera>>
  disconnectCamera: () => Promise<ApiResponse<DisconnectCamera>>
  captureImage: () => Promise<ApiResponse<CaptureCamera>>
  startLiveView: () => Promise<ApiResponse<LiveViewAction>>
  stopLiveView: () => Promise<ApiResponse<LiveViewAction>>
  getLiveViewFrame: () => Promise<ApiResponse<LiveViewFrame>>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
  }
}
