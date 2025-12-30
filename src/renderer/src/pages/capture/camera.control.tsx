import { useCaptureImage, useLiveViewFrame } from '@renderer/hooks/useCamera'
import { useCameraCountdown } from '@renderer/hooks/useCameraCountdown'
import { useElementFullScreen } from '@renderer/hooks/useElementFullScreen'
import { useFocusPoint } from '@renderer/hooks/useFocusPoint'
import { useSettingsVisibility } from '@renderer/hooks/useSettingsVisibility'
import { cn } from '@renderer/lib/utils'
import { useCameraStore } from '@renderer/store/useCameraStore'
import { JSX, useCallback } from 'react'
import { CameraStatus } from 'src/types/camera.type'
import {
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
} from './camera.comp'
import { SettingArrow, SettingPanelBackdrop } from './camera.setting'

interface CameraControlProps {
  statusData: CameraStatus
}

const CameraControl = ({ statusData }: CameraControlProps): JSX.Element => {
  const { data: frameData } = useLiveViewFrame({
    enabled: statusData.isLiveView,
    refetchInterval: 1000 / 30 // 30 FPS
  })

  const { mutate: capture, isPending: isCapturing } = useCaptureImage()

  const { focusPoint, handleFocusClick } = useFocusPoint()
  const { elementRef, isFullscreen, toggleFullscreen } = useElementFullScreen()

  const performCapture = useCallback((): void => {
    capture()
  }, [capture])

  const { countdown, showFlash, startCountdown, isCountingDown } = useCameraCountdown({
    onCapture: performCapture
  })

  const { showSettings, onTouchEnd, onTouchStart, setShowSettings } = useSettingsVisibility()
  const cameraSetting = useCameraStore((state) => state.settings)

  const handleTakePhotoClick = (): void => {
    if (isCountingDown || isCapturing) return
    startCountdown()
  }

  const containerStyle = 'relative h-full rounded-2xl border-2'

  if (!statusData.isConnected) {
    return (
      <div className={cn(containerStyle, 'flex items-center justify-center')}>
        <NotConnected />
      </div>
    )
  }

  if (!statusData.isLiveView) {
    return (
      <div className={cn(containerStyle, 'flex items-center justify-center')}>
        <NotLiveView />
      </div>
    )
  }

  const isInteractionDisabled = isCapturing || isCountingDown

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      ref={elementRef}
      className={cn(
        'group overflow-hidden',
        containerStyle,
        isFullscreen && 'fixed inset-0 z-50 rounded-none border-0 bg-black',
        isInteractionDisabled ? 'pointer-events-none cursor-default' : 'cursor-pointer'
      )}
    >
      <div onClick={handleFocusClick} className="relative overflow-hidden rounded-2xl">
        <img
          src={`data:image/jpeg;base64,${frameData?.data?.image}`}
          alt="Camera Frame"
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {cameraSetting.showGrid && <GridOverlay />}

        <FocusPoint focusPoint={focusPoint} />

        <CornerBracket />

        <RecordingIndicator />

        <div
          className={cn(
            'transition-opacity duration-300',
            showSettings ? 'opacity-0' : 'opacity-100'
          )}
        >
          <FullscreenButton isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
          <Countdown countdown={countdown} />
        </div>

        <ShowFlash showFlash={showFlash} />
      </div>

      <SettingPanelBackdrop isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {!showSettings && !isInteractionDisabled && (
        <SettingArrow onOpen={() => setShowSettings(true)} />
      )}

      {/* Ganti dengan real logic */}
      {/* {false && (
        <div className="animate-in slide-in-from-right absolute top-0 right-0 h-full w-72 duration-300">
          <div className="bg-background/40 h-full rounded-r-2xl border border-l-0 p-4">konten</div>
        </div>
      )} */}

      <TakePhotoButton
        disabled={isInteractionDisabled || showSettings}
        takePhoto={handleTakePhotoClick}
      />
    </div>
  )
}

export default CameraControl
