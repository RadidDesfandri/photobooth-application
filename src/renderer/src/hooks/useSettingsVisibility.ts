import { useCameraStore } from '@renderer/store/useCameraStore'
import { useRef } from 'react'

interface ReturnSettingsVisibility {
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
}

const useSettingsVisibility = (): ReturnSettingsVisibility => {
  const isPanelOpen = useCameraStore((state) => state.isPanelOpen)
  const setPanel = useCameraStore((state) => state.setPanel)

  const touchStartY = useRef<number | null>(null)
  const MIN_SWIPE_DISTANCE = 50

  const onTouchStart = (e: React.TouchEvent): void => {
    touchStartY.current = e.targetTouches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent): void => {
    if (!touchStartY.current) return
    const touchEndY = e.changedTouches[0].clientY
    const distance = touchEndY - touchStartY.current

    // Jika swipe ke bawah lebih dari 50px
    if (distance > MIN_SWIPE_DISTANCE) {
      setPanel(true)
    }
    // Jika swipe ke atas lebih dari 50px (untuk menutup)
    if (distance < -MIN_SWIPE_DISTANCE) {
      setPanel(false)
    }
    touchStartY.current = null
  }

  return { showSettings: isPanelOpen, setShowSettings: setPanel, onTouchStart, onTouchEnd }
}

export { useSettingsVisibility }
