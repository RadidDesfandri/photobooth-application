import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ApiResponse } from 'src/types/api.type'
import { PingCamera } from 'src/types/camera.type'

const usePingCamera = (): UseQueryResult<ApiResponse<PingCamera>, Error> => {
  return useQuery({
    queryKey: ['ping-camera'],
    queryFn: async () => {
      const result = await window.api.pingCamera()

      if (!result.success) {
        throw new Error(result.error?.message || 'Failed to ping camera')
      }

      return result
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 30000,
    refetchOnWindowFocus: false
  })
}

export { usePingCamera }
