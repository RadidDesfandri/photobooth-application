import { useCameraStore } from '@renderer/store/useCameraStore'
import { useEffect, useState } from 'react'

interface UseCameraCountdownProps {
  onCapture: () => void
}

interface ReturnCameraCountdown {
  countdown: number | null
  showFlash: boolean
  startCountdown: () => void
  isCountingDown: boolean
}

const useCameraCountdown = ({ onCapture }: UseCameraCountdownProps): ReturnCameraCountdown => {
  const [countdown, setCountdown] = useState<number | null>(null)
  const [showFlash, setShowFlash] = useState(false)
  const timerDuration = useCameraStore((state) => state.settings.timerDuration)

  useEffect(() => {
    if (countdown === null) return

    if (countdown === 0) {
      setShowFlash(true)

      const captureTimer = setTimeout(() => {
        onCapture()
        setCountdown(null)
      }, 100)

      return () => clearTimeout(captureTimer)
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, onCapture])

  useEffect(() => {
    if (showFlash) {
      const timer = setTimeout(() => {
        setShowFlash(false)
      }, 200)

      return () => clearTimeout(timer)
    }

    return () => {}
  }, [showFlash])

  const startCountdown = (): void => setCountdown(timerDuration)

  return { countdown, showFlash, startCountdown, isCountingDown: countdown !== null }
}

export { useCameraCountdown }
