import type { PingCamera } from '../../types/camera.type'
import { fetchCameraService } from '../libs/axios'

const handlePingCamera = async (): Promise<string> => {
  const response = await fetchCameraService.get<PingCamera>('/ping')
  return response.data
}

export { handlePingCamera }
