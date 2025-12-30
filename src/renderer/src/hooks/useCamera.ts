import { cameraKeys } from '@renderer/config/camera.config'
import { AppError } from '@renderer/lib/app-error'
import { useSessionStore } from '@renderer/store/useSessionStore'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult
} from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiResponse } from 'src/types/api.type'
import {
  CameraStatus,
  CaptureCamera,
  ConnectCamera,
  CreateCameraSession,
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

const useCameraStatus = (options?: {
  enabled?: boolean
  refetchInterval?: number
}): UseQueryResult<ApiResponse<CameraStatus>, Error> => {
  const sessionId = useSessionStore((state) => state.sessionId)

  return useQuery({
    queryKey: [...cameraKeys.status(), sessionId],
    queryFn: async () => {
      const result = await window.api.getCameraStatus(sessionId!)

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

const useLiveViewFrame = (options?: {
  enabled?: boolean
  refetchInterval?: number
}): UseQueryResult<ApiResponse<LiveViewFrame>, Error> => {
  const sessionId = useSessionStore((state) => state.sessionId)

  return useQuery({
    queryKey: [...cameraKeys.liveViewFrame(), sessionId],
    queryFn: async () => {
      const result = await window.api.getLiveViewFrame(sessionId!)

      return result
    },
    retry: 1,
    retryDelay: 500,
    staleTime: 0, // Always fresh
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? false, // Default disabled, harus di-enable manual
    refetchInterval: options?.refetchInterval ?? 100 // Default 100ms untuk smooth video
  })
}

const useConnectCamera = (): UseMutationResult<
  ApiResponse<ConnectCamera>,
  Error,
  void,
  unknown
> => {
  const queryClient = useQueryClient()
  const sessionId = useSessionStore((state) => state.sessionId)

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.connectCamera(sessionId!)

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

const useCaptureImage = (): UseMutationResult<ApiResponse<CaptureCamera>, Error, void, unknown> => {
  const sessionId = useSessionStore((state) => state.sessionId)

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.captureImage(sessionId!)

      return result
    }
  })
}

const useStartLiveView = (): UseMutationResult<
  ApiResponse<LiveViewAction>,
  Error,
  void,
  unknown
> => {
  const sessionId = useSessionStore((state) => state.sessionId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.startLiveView(sessionId!)

      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: cameraKeys.status() })
      }
    }
  })
}

const useStopLiveView = (): UseMutationResult<
  ApiResponse<LiveViewAction>,
  Error,
  void,
  unknown
> => {
  const sessionId = useSessionStore((state) => state.sessionId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.stopLiveView(sessionId!)

      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: cameraKeys.status() })
      }
    }
  })
}

const useAutoConnectCamera = (): {
  statusData: ApiResponse<CameraStatus> | undefined
  isLoading: boolean
  isConnecting: boolean
  isConnected: boolean
} => {
  const statusQuery = useCameraStatus({
    refetchInterval: 2000
  })

  const { mutate: connect, isPending: isPendingConnect } = useConnectCamera()

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

const useCreateSession = (): UseMutationResult<
  ApiResponse<CreateCameraSession>,
  Error,
  void,
  unknown
> => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const setSessionId = useSessionStore((state) => state.setSessionId)

  return useMutation({
    mutationFn: async () => {
      const result = await window.api.createCameraSession()

      return result
    },
    onSuccess: (result) => {
      if (result.success) {
        setSessionId(result.data!.sessionId)
        navigate(`/live-capture`)
        queryClient.invalidateQueries({ queryKey: cameraKeys.status() })
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })
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
  useAutoConnectCamera,
  useCreateSession
}
