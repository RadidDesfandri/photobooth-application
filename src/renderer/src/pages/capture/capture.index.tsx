import BaseLayout from '@renderer/layouts/base-layout'
import { JSX, useEffect, useRef, useState } from 'react'
import CaptureHeader from './capture.header'
import { Button } from '@renderer/components/ui/button'
import { Camera } from 'lucide-react'

function CaptureIndex(): JSX.Element {
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleCameraClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setFocusPoint({ x, y })

    timeoutRef.current = setTimeout(() => {
      setFocusPoint(null)
      timeoutRef.current = null
    }, 2000)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <BaseLayout header={<CaptureHeader />}>
      <div className="flex-1 rounded-md py-8">
        <div
          onClick={handleCameraClick}
          className="relative h-full cursor-pointer overflow-hidden rounded-2xl border-2"
        >
          {/* Camera viewfinder grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border-foreground/30 border" />
              ))}
            </div>
          </div>

          {/* Center focus indicator - only show when clicked */}
          {focusPoint && (
            <div
              className="pointer-events-none absolute flex items-center justify-center"
              style={{
                left: `${focusPoint.x}px`,
                top: `${focusPoint.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="border-primary/60 h-20 w-20 animate-pulse rounded-lg border-2" />
            </div>
          )}

          {/* Corner brackets */}
          <div className="border-foreground/40 absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2" />
          <div className="border-foreground/40 absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2" />
          <div className="border-foreground/40 absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2" />
          <div className="border-foreground/40 absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2" />

          {/* Recording indicator */}
          <div className="bg-card/80 absolute top-4 right-1/2 flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur">
            <div className="bg-destructive animate-status-pulse h-2 w-2 rounded-full" />
            <span className="text-foreground text-xs font-medium">LIVE</span>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <Button
            variant="capture"
            size="capture"
            className="group relative"
            aria-label="Take photo"
          >
            <span className="border-primary-foreground/30 group-hover:border-primary-foreground/50 absolute inset-2 rounded-full border-4 transition-colors" />
            <Camera />
          </Button>
        </div>
      </div>
    </BaseLayout>
  )
}

export default CaptureIndex
