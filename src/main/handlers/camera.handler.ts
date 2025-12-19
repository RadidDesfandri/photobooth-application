import { ipcMain } from 'electron'
import { CameraService } from '../services/camera.service'

const registerCameraHandler = (): void => {
  ipcMain.handle('ping-camera', async () => {
    return await CameraService.pingCamera()
  })
}

export { registerCameraHandler }
