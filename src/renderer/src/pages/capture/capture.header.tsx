import { StatusIndicator } from '@renderer/components/status-indicator'
import { Button } from '@renderer/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { JSX } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptureHeader = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <>
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft /> Back
      </Button>
      <div>Logo</div>
      <div className="flex gap-2">
        <StatusIndicator status="disconnected" label="Camera Not Detected" />
        <StatusIndicator status="disconnected" label="Printer Not Found" />
      </div>
    </>
  )
}

export default CaptureHeader
