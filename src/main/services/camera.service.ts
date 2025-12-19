import { ApiResponse } from '../../types/api.type'
import { PingCamera, pingCameraSchema } from '../../types/camera.type'
import { apiRequest } from '../libs/request'

export const CameraService = {
  async pingCamera() {
    const response = await apiRequest<PingCamera>({
      url: '/ping',
      method: 'GET'
    })

    if (response.success && response.data) {
      try {
        const validated = pingCameraSchema.parse(response.data)
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
  }
}
