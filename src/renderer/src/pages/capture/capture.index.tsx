import { useAutoConnectCamera } from '@renderer/hooks/useCamera'
import BaseLayout from '@renderer/layouts/base-layout'
import { JSX } from 'react'
import CameraControl from './camera.control'
import CaptureHeader from './capture.header'

function CaptureIndex(): JSX.Element {
  const { statusData, isLoading, isConnecting, isConnected } = useAutoConnectCamera()

  if (isLoading || !statusData?.data) {
    return <div className="min-h-screen">Loading...</div>
  }

  return (
    <BaseLayout
      header={
        <CaptureHeader
          isCameraConnected={isConnected}
          isLoadingCamera={isConnecting}
          isPrinterConnected={false}
          isLoadingPrinter={false}
        />
      }
    >
      <div className="flex-1 rounded-md py-8">
        <CameraControl statusData={statusData.data} />
      </div>
    </BaseLayout>
  )
}

export default CaptureIndex
