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
  getCameraStatus: (sessionId: string) => Promise<ApiResponse<CameraStatus>>
  connectCamera: (sessionId: string) => Promise<ApiResponse<ConnectCamera>>
  disconnectCamera: (sessionId: string) => Promise<ApiResponse<DisconnectCamera>>
  captureImage: (sessionId: string) => Promise<ApiResponse<CaptureCamera>>
  startLiveView: (sessionId: string) => Promise<ApiResponse<LiveViewAction>>
  stopLiveView: (sessionId: string) => Promise<ApiResponse<LiveViewAction>>
  getLiveViewFrame: (sessionId: string) => Promise<ApiResponse<LiveViewFrame>>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
  }
}
