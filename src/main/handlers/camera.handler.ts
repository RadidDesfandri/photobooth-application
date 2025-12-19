import { ipcMain } from 'electron'
import { CameraService } from '../services/camera.service'

const registerCameraHandler = (): void => {
  ipcMain.handle('ping-camera', async () => {
    try {
      return await CameraService.pingCamera()
    } catch (error) {
      console.error('[IPC Error] ping-camera:', error)
      return {
        success: false,
        data: null,
        error: {
          code: 'IPC_ERROR',
          message: error instanceof Error ? error.message : 'Unknown IPC error'
        }
      }
    }
  })
}

export { registerCameraHandler }
