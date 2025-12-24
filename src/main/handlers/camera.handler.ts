import { ipcMain } from 'electron'
import { CameraService } from '../services/camera.service'
import { ipcCameraKeys } from './camera.config'

const registerCameraHandler = (): void => {
  ipcMain.handle(ipcCameraKeys.ping, async () => {
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

  ipcMain.handle(ipcCameraKeys.cameraStatus, async () => {
    try {
      return await CameraService.getStatus()
    } catch (error) {
      console.error('[IPC Error] camera-status:', error)
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

  ipcMain.handle(ipcCameraKeys.connect, async () => {
    try {
      return await CameraService.connect()
    } catch (error) {
      console.error('[IPC Error] connect-camera:', error)
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

  ipcMain.handle(ipcCameraKeys.disconnect, async () => {
    try {
      return await CameraService.disconnect()
    } catch (error) {
      console.error('[IPC Error] disconnect-camera:', error)
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

  ipcMain.handle(ipcCameraKeys.capture, async () => {
    try {
      return await CameraService.capture()
    } catch (error) {
      console.error('[IPC Error] camera-capture:', error)
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

  ipcMain.handle(ipcCameraKeys.startLiveView, async () => {
    try {
      return await CameraService.startLiveView()
    } catch (error) {
      console.error('[IPC Error] start-liveview:', error)
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

  ipcMain.handle(ipcCameraKeys.stopLiveView, async () => {
    try {
      return await CameraService.stopLiveView()
    } catch (error) {
      console.error('[IPC Error] camera-liveview-stop:', error)
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

  ipcMain.handle(ipcCameraKeys.liveViewFrame, async () => {
    try {
      return await CameraService.getLiveViewFrame()
    } catch (error) {
      console.error('[IPC Error] camera-liveview-frame:', error)
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
