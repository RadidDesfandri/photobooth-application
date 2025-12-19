import { ElectronAPI } from '@electron-toolkit/preload'
import { PingCamera } from 'src/types/camera.type'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      pingCamera: () => Promise<PingCamera>
    }
  }
}
