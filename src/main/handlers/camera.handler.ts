import { ipcMain } from 'electron'
import { handleFetchUsers } from '../services/camera.service'

const registerCameraHandler = (): void => {
  ipcMain.handle('fetch-users', handleFetchUsers)
}

export { registerCameraHandler }
