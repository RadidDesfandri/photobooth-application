import { Button } from '@renderer/components/ui/button'
import { useStartLiveView } from '@renderer/hooks/useCamera'
import { cn } from '@renderer/lib/utils'
import { Camera, CameraOff, Maximize, Minimize, TvMinimalPlay } from 'lucide-react'
import { JSX } from 'react'

const NotConnected = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <div className="bg-destructive/20 flex h-20 w-20 items-center justify-center rounded-full">
        <CameraOff className="text-destructive h-10 w-10" />
      </div>
      <h4 className="text-2xl font-bold">Camera Not Detected</h4>
      <p className="text-neutral-400">Please connect your camera to continue</p>
    </div>
  )
}

const NotLiveView = (): JSX.Element => {
  const { mutate, isPending } = useStartLiveView()

  return (
    <div className="flex flex-col items-center gap-y-3">
      <div className="bg-destructive/20 flex h-20 w-20 items-center justify-center rounded-full">
        <TvMinimalPlay className="text-destructive h-10 w-10" />
      </div>
      <h4 className="text-2xl font-bold">Camera Not Live</h4>
      <p className="text-neutral-400">Please start liveview to continue</p>
      <Button disabled={isPending} onClick={() => mutate()}>
        Start Liveview
      </Button>
    </div>
  )
}

const CornerBracket = (): JSX.Element => {
  return (
    <>
      <div className="border-foreground/40 absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2" />
      <div className="border-foreground/40 absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2" />
      <div className="border-foreground/40 absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2" />
      <div className="border-foreground/40 absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2" />
    </>
  )
}

const RecordingIndicator = (): JSX.Element => {
  return (
    <div className="bg-card/80 absolute top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur">
      <div className="bg-destructive animate-status-pulse h-2 w-2 rounded-full" />
      <span className="text-foreground text-xs font-medium">LIVE</span>
    </div>
  )
}

const GridOverlay = (): JSX.Element => {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="border-foreground/30 border" />
        ))}
      </div>
    </div>
  )
}

const FocusPoint = ({
  focusPoint
}: {
  focusPoint: { x: number; y: number } | null
}): JSX.Element | null => {
  if (!focusPoint) return null

  return (
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
  )
}

const FullscreenButton = ({
  isFullscreen,
  toggleFullscreen
}: {
  isFullscreen: boolean
  toggleFullscreen: () => void
}): JSX.Element => {
  return (
    <div className="absolute right-4 bottom-4 z-30">
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
        onClick={(e) => {
          e.stopPropagation()
          toggleFullscreen()
        }}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      </Button>
    </div>
  )
}

const ShowFlash = ({ showFlash }: { showFlash: boolean }): JSX.Element | null => {
  if (!showFlash) return null

  return <div className="animate-in fade-in absolute inset-0 bg-white duration-100" />
}

const Countdown = ({ countdown }: { countdown: number | null }): JSX.Element | null => {
  if (!countdown) return null

  return (
    <div className="bg-background/60 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
      <span key={countdown} className="text-primary animate-countdown text-9xl font-bold">
        {countdown}
      </span>
    </div>
  )
}

const TakePhotoButton = ({
  takePhoto,
  disabled
}: {
  takePhoto: () => void
  disabled: boolean
}): JSX.Element => {
  return (
    <div className={cn('absolute bottom-4 left-1/2 -translate-x-1/2')}>
      <Button
        variant="capture"
        size="capture"
        className="group relative"
        aria-label="Take photo"
        onClick={takePhoto}
        disabled={disabled}
      >
        <span className="border-primary-foreground/30 group-hover:border-primary-foreground/50 absolute inset-2 rounded-full border-4 transition-colors" />
        <Camera />
      </Button>
    </div>
  )
}

export {
  CornerBracket,
  Countdown,
  FocusPoint,
  FullscreenButton,
  GridOverlay,
  NotConnected,
  NotLiveView,
  RecordingIndicator,
  ShowFlash,
  TakePhotoButton
}
