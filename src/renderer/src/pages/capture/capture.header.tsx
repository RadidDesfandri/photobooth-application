import { StatusIndicator } from '@renderer/components/status-indicator'
import { Button } from '@renderer/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { JSX } from 'react'
import { useNavigate } from 'react-router-dom'

interface CaptureHeaderProps {
  isCameraConnected: boolean
  isPrinterConnected: boolean
  isLoadingCamera: boolean
  isLoadingPrinter: boolean
}

const CaptureHeader = ({
  isCameraConnected,
  isPrinterConnected,
  isLoadingCamera,
  isLoadingPrinter
}: CaptureHeaderProps): JSX.Element => {
  const navigate = useNavigate()

  const statusCamera = isLoadingCamera
    ? 'loading'
    : isCameraConnected
      ? 'connected'
      : 'disconnected'

  const statusPrinter = isLoadingPrinter
    ? 'loading'
    : isPrinterConnected
      ? 'connected'
      : 'disconnected'

  const labelCamera = isCameraConnected ? 'Camera Connected' : 'Camera Not Detected'
  const labelPrinter = isPrinterConnected ? 'Printer Ready' : 'Printer Not Found'

  return (
    <>
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft /> Back
      </Button>
      <div>Logo</div>
      <div className="flex gap-2">
        <StatusIndicator status={statusCamera} label={labelCamera} />
        <StatusIndicator status={statusPrinter} label={labelPrinter} />
      </div>
    </>
  )
}

export default CaptureHeader
