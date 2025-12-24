// components/CameraControl.tsx
import {
  useCameraStatus,
  useCaptureImage,
  useConnectCamera,
  useDisconnectCamera,
  useLiveViewFrame,
  usePingCamera,
  useStartLiveView,
  useStopLiveView
} from '@renderer/hooks/useCamera'
import { JSX, useState } from 'react'

function CameraControl(): JSX.Element {
  const [isLiveViewActive, setIsLiveViewActive] = useState(false)

  // Queries
  const { data: pingData, isLoading: isPinging } = usePingCamera()
  const { data: statusData, isLoading: isLoadingStatus } = useCameraStatus({
    refetchInterval: 2000 // Poll status setiap 2 detik
  })

  // LiveView Frame (hanya aktif ketika liveview diaktifkan)
  const { data: frameData } = useLiveViewFrame({
    enabled: isLiveViewActive,
    refetchInterval: 100 // 10 FPS
  })

  // Mutations
  const connectMutation = useConnectCamera()
  const disconnectMutation = useDisconnectCamera()
  const captureMutation = useCaptureImage()
  const startLiveViewMutation = useStartLiveView()
  const stopLiveViewMutation = useStopLiveView()

  // Handlers
  const handleConnect = (): void => {
    connectMutation.mutate()
  }

  const handleDisconnect = (): void => {
    if (isLiveViewActive) {
      stopLiveViewMutation.mutate(undefined, {
        onSuccess: () => {
          setIsLiveViewActive(false)
          disconnectMutation.mutate()
        }
      })
    } else {
      disconnectMutation.mutate()
    }
  }

  const handleCapture = (): void => {
    captureMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log('Image captured:', data.data)
        alert(`Image saved: ${data.data?.filename}`)
      }
    })
  }

  const handleStartLiveView = (): void => {
    startLiveViewMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLiveViewActive(true)
      }
    })
  }

  const handleStopLiveView = (): void => {
    stopLiveViewMutation.mutate(undefined, {
      onSuccess: () => {
        setIsLiveViewActive(false)
      }
    })
  }

  const isConnected = statusData?.data?.isConnected
  const cameraState = statusData?.data?.state
  const isLiveView = statusData?.data?.isLiveView

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-2xl font-bold">Camera Control</h2>

      {/* Status Display */}
      <div className="rounded-lg bg-gray-100 p-4 text-black">
        <p className="text-sm">
          <strong>Status:</strong> {isLoadingStatus ? 'Loading...' : cameraState || 'Unknown'}
        </p>
        <p className="text-sm">
          <strong>Connected:</strong> {isConnected ? '✅ Yes' : '❌ No'}
        </p>
        <p className="text-sm">
          <strong>LiveView:</strong> {isLiveView ? '✅ Yes' : '❌ No'}
        </p>
        <p className="text-sm">
          <strong>Ping:</strong> {isPinging ? 'Pinging...' : pingData?.data || 'N/A'}
        </p>
      </div>

      {/* Connection Controls */}
      <div className="flex gap-2">
        <button
          onClick={handleConnect}
          disabled={isConnected || connectMutation.isPending}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
        >
          {connectMutation.isPending ? 'Connecting...' : 'Connect'}
        </button>

        <button
          onClick={handleDisconnect}
          disabled={!isConnected || disconnectMutation.isPending}
          className="rounded bg-red-500 px-4 py-2 text-white disabled:bg-gray-400"
        >
          {disconnectMutation.isPending ? 'Disconnecting...' : 'Disconnect'}
        </button>
      </div>

      {/* LiveView Controls */}
      {isConnected && (
        <div className="flex gap-2">
          <button
            onClick={handleStartLiveView}
            disabled={isLiveViewActive || startLiveViewMutation.isPending}
            className="rounded bg-green-500 px-4 py-2 text-white disabled:bg-gray-400"
          >
            {startLiveViewMutation.isPending ? 'Starting...' : 'Start LiveView'}
          </button>

          <button
            onClick={handleStopLiveView}
            disabled={!isLiveViewActive || stopLiveViewMutation.isPending}
            className="rounded bg-orange-500 px-4 py-2 text-white disabled:bg-gray-400"
          >
            {stopLiveViewMutation.isPending ? 'Stopping...' : 'Stop LiveView'}
          </button>
        </div>
      )}

      {/* Capture Button */}
      {isConnected && (
        <button
          onClick={handleCapture}
          disabled={captureMutation.isPending}
          className="rounded bg-purple-500 px-4 py-2 text-white disabled:bg-gray-400"
        >
          {captureMutation.isPending ? '📸 Capturing...' : '📸 Capture Image'}
        </button>
      )}

      {/* LiveView Display */}
      {isLiveViewActive && frameData?.data && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">Live View</h3>
          <img
            src={`data:image/jpeg;base64,${frameData.data.image}`}
            alt="Live View"
            className="w-full max-w-2xl rounded-lg border-2 border-gray-300"
          />
          <p className="mt-1 text-xs text-gray-500">
            Frame: {frameData.data.timestamp} | Size: {(frameData.data.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      {/* Error Display */}
      {connectMutation.isError && (
        <div className="rounded bg-red-100 p-3 text-red-700">
          Connect Error: {connectMutation.error.message}
        </div>
      )}
      {captureMutation.isError && (
        <div className="rounded bg-red-100 p-3 text-red-700">
          Capture Error: {captureMutation.error.message}
        </div>
      )}
    </div>
  )
}

export default CameraControl
