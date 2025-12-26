import { useState, useRef, useEffect } from 'react'

interface ReturnFullScreen {
  elementRef: React.RefObject<HTMLDivElement | null>
  isFullscreen: boolean
  toggleFullscreen: () => void
}

const useElementFullScreen = (): ReturnFullScreen => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = async (): Promise<void> => {
    if (!elementRef.current) return

    try {
      if (!document.fullscreenElement) {
        await elementRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err)
    }
  }

  useEffect(() => {
    const handleChange = (): void => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  return { elementRef, isFullscreen, toggleFullscreen }
}

export { useElementFullScreen }
