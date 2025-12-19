import { ipcMain } from 'electron'
import { handlePingCamera } from '../services/camera.service'

const registerCameraHandler = (): void => {
  ipcMain.handle('ping-camera', handlePingCamera)
}

export { registerCameraHandler }
