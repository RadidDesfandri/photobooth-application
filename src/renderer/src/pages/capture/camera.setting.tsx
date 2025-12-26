import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { useCameraStore } from '@renderer/store/useCameraStore'
import { ChevronDown, ChevronUp, Settings } from 'lucide-react'
import { JSX } from 'react'

const SettingPanelBackdrop = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}): JSX.Element => {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 z-40 w-full bg-black/60 backdrop-blur-md transition-transform duration-500 ease-in-out',
        isOpen ? 'translate-y-0' : '-translate-y-full',
        'h-auto min-h-full rounded-b-3xl border-b border-white/20 shadow-2xl'
      )}
    >
      <div
        className="flex w-full cursor-pointer items-center justify-center py-4 hover:bg-white/10"
        onClick={onClose}
      >
        <ChevronUp className="h-6 w-6 text-white/70" />
      </div>

      <SettingPanelContent />
    </div>
  )
}

const SettingPanelContent = (): JSX.Element => {
  const updateSetting = useCameraStore((state) => state.updateSetting)
  const cameraSetting = useCameraStore((state) => state.settings)

  return (
    <div className="p-6 text-white">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <Settings className="h-5 w-5" /> Camera Settings
      </h3>
      <div className="space-y-4">
        <Button onClick={() => updateSetting('showGrid', !cameraSetting.showGrid)}>
          {cameraSetting.showGrid ? 'Hide' : 'Show'} Grid
        </Button>
        <div>
          <p>Timer</p>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => updateSetting('timerDuration', 1)}
              disabled={cameraSetting.timerDuration === 1}
            >
              1 Detik
            </Button>
            <Button
              onClick={() => updateSetting('timerDuration', 3)}
              disabled={cameraSetting.timerDuration === 3}
            >
              3 Detik
            </Button>
            <Button
              onClick={() => updateSetting('timerDuration', 5)}
              disabled={cameraSetting.timerDuration === 5}
            >
              5 Detik
            </Button>
            <Button
              onClick={() => updateSetting('timerDuration', 10)}
              disabled={cameraSetting.timerDuration === 10}
            >
              10 Detik
            </Button>
          </div>
        </div>
        <div className="rounded bg-white/10 p-4">ISO Settings</div>
        <div className="rounded bg-white/10 p-4">Shutter Speed</div>
      </div>
    </div>
  )
}

const SettingArrow = ({ onOpen }: { onOpen: () => void }): JSX.Element => {
  return (
    <div
      onClick={onOpen}
      className="absolute top-0 right-0 left-0 z-30 flex h-20 w-full cursor-pointer justify-center bg-linear-to-b from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
    >
      <div className="mt-2 rounded-full bg-black/40 p-1 backdrop-blur-sm">
        <ChevronDown className="h-6 w-6 animate-bounce text-white" />
      </div>
    </div>
  )
}

export { SettingPanelBackdrop, SettingPanelContent, SettingArrow }
