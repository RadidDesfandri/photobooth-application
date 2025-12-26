import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CameraSettings {
  iso: string
  shutterSpeed: string
  aperture: string
  whiteBalance: string
  showGrid: boolean
  timerDuration: number
}

interface CameraStoreState {
  // State
  settings: CameraSettings
  isPanelOpen: boolean

  // Actions
  updateSetting: (key: keyof CameraSettings, value: string | boolean | number) => void
  togglePanel: () => void
  setPanel: (isOpen: boolean) => void
}

const defaultSettings: CameraSettings = {
  iso: 'auto',
  shutterSpeed: 'auto',
  aperture: 'auto',
  whiteBalance: 'auto',
  showGrid: false,
  timerDuration: 3
}

export const useCameraStore = create<CameraStoreState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      isPanelOpen: false,

      updateSetting: (key, value) =>
        set((state) => ({
          settings: { ...state.settings, [key]: value }
        })),

      togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
      setPanel: (isOpen) => set({ isPanelOpen: isOpen })
    }),
    {
      name: 'camera-settings-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
