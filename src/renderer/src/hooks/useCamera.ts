import { useQuery } from '@tanstack/react-query'

const usePingCamera = (): ReturnType<typeof useQuery> => {
  return useQuery({
    queryKey: ['ping-camera'],
    queryFn: async () => {
      const response = await window.api.pingCamera()

      return response
    }
  })
}

export { usePingCamera }
