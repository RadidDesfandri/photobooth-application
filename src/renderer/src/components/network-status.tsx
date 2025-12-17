import { JSX, useEffect, useState } from 'react'

const NetworkStatus = (): JSX.Element | null => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = (): void => setIsOnline(true)
    const handleOffline = (): void => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed bottom-0 z-50 w-full bg-red-800 p-2 text-center font-mono font-semibold text-white">
      ⚠️ Koneksi Terputus. Memeriksa jaringan...
    </div>
  )
}

export default NetworkStatus
