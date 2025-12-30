import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SessionState {
  sessionId: string | null
  setSessionId: (id: string) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: null,

      setSessionId: (id) => set({ sessionId: id }),

      clearSession: () => set({ sessionId: null })
    }),
    {
      name: 'photobooth-session-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
