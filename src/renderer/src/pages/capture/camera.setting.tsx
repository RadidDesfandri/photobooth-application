import { Label } from '@renderer/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@renderer/components/ui/radio-group'
import { Switch } from '@renderer/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/components/ui/tabs'
import { cn } from '@renderer/lib/utils'
import { useCameraStore } from '@renderer/store/useCameraStore'
import {
  Aperture,
  Camera,
  ChevronDown,
  ChevronUp,
  Grid3x3,
  Settings,
  Sun,
  Timer,
  Zap
} from 'lucide-react'
import React from 'react'

const SettingPanelBackdrop = ({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}): React.JSX.Element => {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 z-40 w-full bg-black/60 backdrop-blur-md transition-transform duration-500 ease-in-out',
        isOpen ? 'translate-y-0' : '-translate-y-full',
        'h-auto min-h-full rounded-b-3xl border-b border-white/20 shadow-2xl'
      )}
    >
      <div
        className="flex w-full cursor-pointer items-center justify-center py-2 transition-colors hover:bg-white/5"
        onClick={onClose}
      >
        <div className="flex flex-col items-center gap-1">
          <ChevronUp className="h-6 w-6 text-white/70" />
          <span className="text-xs text-white/50">Tutup Pengaturan</span>
        </div>
      </div>

      <SettingPanelContent />
    </div>
  )
}

const SettingPanelContent = (): React.JSX.Element => {
  const updateSetting = useCameraStore((state) => state.updateSetting)
  const cameraSetting = useCameraStore((state) => state.settings)

  const isoOptions = ['auto', '100', '200', '400', '800', '1600', '3200']
  const shutterSpeedOptions = ['auto', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30']
  const apertureOptions = ['auto', 'f/1.4', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8']
  const whiteBalanceOptions = [
    { value: 'auto', label: 'Auto', icon: Zap },
    { value: 'daylight', label: 'Daylight', icon: Sun },
    { value: 'cloudy', label: 'Cloudy', icon: Sun },
    { value: 'tungsten', label: 'Tungsten', icon: Sun },
    { value: 'fluorescent', label: 'Fluorescent', icon: Sun }
  ]

  return (
    <div className="px-6 pb-8 text-white">
      <div className="mb-6">
        <h3 className="flex items-center gap-2 bg-linear-to-r from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent">
          <Settings className="h-6 w-6 text-white" />
          Pengaturan Kamera
        </h3>
        <p className="mt-1 text-sm text-white/50">Sesuaikan pengaturan untuk hasil foto terbaik</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 bg-white/10">
          <TabsTrigger value="basic" className="dark:data-[state=active]:bg-white/20">
            Dasar
          </TabsTrigger>
          <TabsTrigger value="advanced" className="dark:data-[state=active]:bg-white/20">
            Lanjutan
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="mt-0 space-y-4">
          {/* Grid Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/10">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Grid3x3 className="h-5 w-5" />
              </div>
              <div>
                <Label htmlFor="grid-toggle" className="cursor-pointer text-base font-semibold">
                  Grid Bantu
                </Label>
                <p className="text-xs text-white/50">Tampilkan garis bantu komposisi</p>
              </div>
            </div>

            <Switch
              id="grid-toggle"
              checked={cameraSetting.showGrid}
              onCheckedChange={(checked) => updateSetting('showGrid', checked)}
              className="data-[state=checked]:bg-blue-500"
            />
          </div>

          {/* Timer Selection */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Timer className="h-5 w-5" />
              </div>
              <div>
                <Label className="text-base font-semibold">Timer Foto</Label>
                <p className="text-xs text-white/50">Waktu tunda sebelum foto diambil</p>
              </div>
            </div>
            <RadioGroup
              value={cameraSetting.timerDuration.toString()}
              onValueChange={(value) => updateSetting('timerDuration', parseInt(value))}
              className="grid grid-cols-4 gap-3"
            >
              {[1, 3, 5, 10].map((duration) => (
                <div key={duration}>
                  <RadioGroupItem
                    value={duration.toString()}
                    id={`timer-${duration}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`timer-${duration}`}
                    className={cn(
                      'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 p-1 transition-all hover:border-white/40 hover:bg-white/10',
                      'peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/20'
                    )}
                  >
                    <span className="text-xl font-bold">{duration}</span>
                    <span className="text-xs text-white/60">detik</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* White Balance */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <Label className="text-base font-semibold">White Balance</Label>
                <p className="text-xs text-white/50">Sesuaikan keseimbangan warna</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {whiteBalanceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateSetting('whiteBalance', option.value)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border-2 p-2 text-left transition-all',
                    cameraSetting.whiteBalance === option.value
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                  )}
                >
                  <option.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-0 grid grid-cols-2 gap-4">
          {/* ISO Settings */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <Label className="text-base font-semibold">ISO</Label>
                <p className="text-xs text-white/50">Sensitivitas sensor terhadap cahaya</p>
              </div>
            </div>
            <RadioGroup
              value={cameraSetting.iso}
              onValueChange={(value) => updateSetting('iso', value)}
              className="grid grid-cols-4 gap-2"
            >
              {isoOptions.map((iso) => (
                <div key={iso}>
                  <RadioGroupItem value={iso} id={`iso-${iso}`} className="peer sr-only" />
                  <Label
                    htmlFor={`iso-${iso}`}
                    className={cn(
                      'flex cursor-pointer items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 p-2.5 text-sm font-medium transition-all hover:border-white/40 hover:bg-white/10',
                      'peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/20'
                    )}
                  >
                    {iso === 'auto' ? 'Auto' : iso}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Shutter Speed */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <Label className="text-base font-semibold">Shutter Speed</Label>
                <p className="text-xs text-white/50">Kecepatan rana kamera</p>
              </div>
            </div>
            <RadioGroup
              value={cameraSetting.shutterSpeed}
              onValueChange={(value) => updateSetting('shutterSpeed', value)}
              className="grid grid-cols-4 gap-2"
            >
              {shutterSpeedOptions.map((speed) => (
                <div key={speed}>
                  <RadioGroupItem value={speed} id={`shutter-${speed}`} className="peer sr-only" />
                  <Label
                    htmlFor={`shutter-${speed}`}
                    className={cn(
                      'flex cursor-pointer items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 p-2.5 text-xs font-medium transition-all hover:border-white/40 hover:bg-white/10',
                      'peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/20'
                    )}
                  >
                    {speed === 'auto' ? 'Auto' : speed}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Aperture */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <Aperture className="h-5 w-5" />
              </div>
              <div>
                <Label className="text-base font-semibold">Aperture</Label>
                <p className="text-xs text-white/50">Bukaan diafragma lensa</p>
              </div>
            </div>
            <RadioGroup
              value={cameraSetting.aperture}
              onValueChange={(value) => updateSetting('aperture', value)}
              className="grid grid-cols-4 gap-2"
            >
              {apertureOptions.map((aperture) => (
                <div key={aperture}>
                  <RadioGroupItem
                    value={aperture}
                    id={`aperture-${aperture}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`aperture-${aperture}`}
                    className={cn(
                      'flex cursor-pointer items-center justify-center rounded-lg border-2 border-white/20 bg-white/5 p-2.5 text-sm font-medium transition-all hover:border-white/40 hover:bg-white/10',
                      'peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500/20'
                    )}
                  >
                    {aperture === 'auto' ? 'Auto' : aperture}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const SettingArrow = ({ onOpen }: { onOpen: () => void }): React.JSX.Element => {
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

export { SettingArrow, SettingPanelBackdrop, SettingPanelContent }
