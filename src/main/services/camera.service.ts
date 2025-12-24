import * as schema from '../../schemas/camera.schema'
import { ApiResponse } from '../../types/api.type'
import type {
  CameraStatus,
  CaptureCamera,
  ConnectCamera,
  DisconnectCamera,
  LiveViewAction,
  LiveViewFrame,
  PingCamera
} from '../../types/camera.type'
import { apiRequest } from '../libs/request'

export const CameraService = {
  async pingCamera() {
    const response = await apiRequest<PingCamera>({
      url: '/ping',
      method: 'GET'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.pingCameraSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message:
              error instanceof Error ? error.message : 'Invalid response format from camera service'
          }
        } as ApiResponse<PingCamera>
      }
    }

    return response
  },

  async getStatus() {
    const response = await apiRequest<CameraStatus>({
      url: '/status',
      method: 'GET'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.cameraStatusSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message:
              error instanceof Error ? error.message : 'Invalid response format from camera service'
          }
        } as ApiResponse<CameraStatus>
      }
    }

    return response
  },

  async connect() {
    const response = await apiRequest<ConnectCamera>({
      url: '/connect',
      method: 'POST'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.connectCameraSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: error instanceof Error ? error.message : 'Invalid connect response format'
          }
        } as ApiResponse<ConnectCamera>
      }
    }

    return response
  },

  async disconnect() {
    const response = await apiRequest<DisconnectCamera>({
      url: '/disconnect',
      method: 'POST'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.disconnectCameraSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: error instanceof Error ? error.message : 'Invalid disconnect response format'
          }
        } as ApiResponse<DisconnectCamera>
      }
    }

    return response
  },

  async capture() {
    const response = await apiRequest<CaptureCamera>({
      url: '/capture',
      method: 'POST'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.captureCameraSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: error instanceof Error ? error.message : 'Invalid capture response format'
          }
        } as ApiResponse<CaptureCamera>
      }
    }

    return response
  },

  async startLiveView() {
    const response = await apiRequest<LiveViewAction>({
      url: '/liveview/start',
      method: 'POST'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.liveViewActionSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: error instanceof Error ? error.message : 'Invalid liveview start response'
          }
        } as ApiResponse<LiveViewAction>
      }
    }

    return response
  },

  async stopLiveView() {
    const response = await apiRequest<LiveViewAction>({
      url: '/liveview/stop',
      method: 'POST'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.liveViewActionSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: error instanceof Error ? error.message : 'Invalid liveview stop response'
          }
        } as ApiResponse<LiveViewAction>
      }
    }

    return response
  },

  async getLiveViewFrame() {
    const response = await apiRequest<LiveViewFrame>({
      url: '/liveview/frame',
      method: 'GET'
    })

    if (response.success && response.data) {
      try {
        const validated = schema.liveViewFrameSchema.parse(response.data)
        return { ...response, data: validated }
      } catch (error) {
        return {
          success: false,
          data: null,
          error: {
            code: 'VALIDATION_ERROR',
            message: error instanceof Error ? error.message : 'Invalid frame response format'
          }
        } as ApiResponse<LiveViewFrame>
      }
    }

    return response
  }
}
