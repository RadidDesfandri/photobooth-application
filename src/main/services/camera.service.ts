import { PingCamera } from '../../types/camera.type'
import { apiRequest } from '../libs/request'

export const CameraService = {
  pingCamera() {
    return apiRequest<PingCamera>({
      url: '/ping',
      method: 'GET'
    })
  }
}
