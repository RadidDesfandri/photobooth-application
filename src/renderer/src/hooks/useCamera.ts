import { cameraKeys } from '@renderer/config/camera.config'
import { AppError } from '@renderer/lib/app-error'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query'
import { useEffect } from 'react'
import { ApiResponse } from 'src/types/api.type'
import {
  CameraStatus,
  CaptureCamera,
  ConnectCamera,
  DisconnectCamera,
  LiveViewAction,
  LiveViewFrame,
  PingCamera
} from 'src/types/camera.type'

const usePingCamera = (): UseQueryResult<ApiResponse<PingCamera>, Error> => {
  return useQuery({
    queryKey: cameraKeys.ping(),
    queryFn: async () => {
      const result = await window.api.pingCamera()

      if (!result.success) {
        throw new AppError(
          result.error?.code ?? 'UNKNOWN',
          result.error?.message ?? 'Failed to ping camera'
        )
      }

      return result
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 30000,
    refetchOnWindowFocus: false
  })
}

const useCameraStatus = (
  sessionId: string,
  options?: {
    enabled?: boolean
    refetchInterval?: number
  }
): UseQueryResult<ApiResponse<CameraStatus>, Error> => {
  return useQuery({
    queryKey: [...cameraKeys.status(), sessionId],
    queryFn: async () => {
      const result = await window.api.getCameraStatus(sessionId)

      if (!result.success) {
        throw new AppError(
          result.error?.code ?? 'UNKNOWN',
          result.error?.message ?? 'Failed to get camera status'
        )
      }

      return result
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 5000,
    refetchOnWindowFocus: true,
    enabled: (options?.enabled ?? true) && !!sessionId,
    refetchInterval: options?.refetchInterval
  })
}

const useLiveViewFrame = (
  sessionId: string,
  options?: {
    enabled?: boolean
    refetchInterval?: number
  }
): UseQueryResult<ApiResponse<LiveViewFrame>, Error> => {
  return useQuery({
    queryKey: [...cameraKeys.liveViewFrame(), sessionId],
    queryFn: async () => {
      const result = await window.api.getLiveViewFrame(sessionId)

      return result
    },
    retry: 1,
    retryDelay: 500,
    staleTime: 0, // Always fresh
    refetchOnWindowFocus: false,
    enabled: (options?.enabled ?? false) && !!sessionId, // Default disabled, harus di-enable manual
    refetchInterval: options?.refetchInterval ?? 100 // Default 100ms untuk smooth video
  })
}

const useConnectCamera = (
  sessionId: string
): UseMutationResult<ApiResponse<ConnectCamera>, Error, void, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.connectCamera(sessionId)

      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: cameraKeys.status() })
      }
    }
  })
}

const useDisconnectCamera = (
  sessionId: string
): UseMutationResult<ApiResponse<DisconnectCamera>, Error, void, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.disconnectCamera(sessionId)

      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: cameraKeys.status() })
      }
    }
  })
}

const useCaptureImage = (
  sessionId: string
): UseMutationResult<ApiResponse<CaptureCamera>, Error, void, unknown> => {
  return useMutation({
    mutationFn: async () => {
      const result = await window.api.captureImage(sessionId)

      return result
    }
  })
}

const useStartLiveView = (
  sessionId: string
): UseMutationResult<ApiResponse<LiveViewAction>, Error, void, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.startLiveView(sessionId)

      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: cameraKeys.status() })
      }
    }
  })
}

const useStopLiveView = (
  sessionId: string
): UseMutationResult<ApiResponse<LiveViewAction>, Error, void, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.stopLiveView(sessionId)

      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: cameraKeys.status() })
      }
    }
  })
}

const useAutoConnectCamera = (
  sessionId: string
): {
  statusData: ApiResponse<CameraStatus> | undefined
  isLoading: boolean
  isConnecting: boolean
  isConnected: boolean
} => {
  const statusQuery = useCameraStatus(sessionId, {
    refetchInterval: 2000
  })

  const { mutate: connect, isPending: isPendingConnect } = useConnectCamera(sessionId)

  const isConnected = statusQuery.data?.data?.isConnected
  const shouldConnect = !statusQuery.isLoading && !isConnected && !isPendingConnect

  useEffect(() => {
    if (shouldConnect) {
      connect()
    }
  }, [shouldConnect, connect])

  return {
    statusData: statusQuery.data,
    isLoading: statusQuery.isLoading,
    isConnecting: isPendingConnect,
    isConnected: isConnected ?? false
  }
}

export {
  usePingCamera,
  useCameraStatus,
  useLiveViewFrame,
  useConnectCamera,
  useDisconnectCamera,
  useCaptureImage,
  useStartLiveView,
  useStopLiveView,
  useAutoConnectCamera
}
