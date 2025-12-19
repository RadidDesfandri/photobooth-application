import { ElectronAPI } from '@electron-toolkit/preload'
import { ApiResponse } from 'src/types/api.type'
import { PingCamera } from 'src/types/camera.type'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      pingCamera: () => Promise<ApiResponse<PingCamera>>
    }
  }
}
