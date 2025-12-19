import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ApiResponse } from 'src/types/api.type'
import { PingCamera } from 'src/types/camera.type'

const usePingCamera = (): UseQueryResult<ApiResponse<PingCamera>, Error> => {
  return useQuery({
    queryKey: ['ping-camera'],
    queryFn: async () => window.api.pingCamera()
  })
}

export { usePingCamera }
