import { useEffect, useState } from 'react'

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed bottom-0 w-full bg-red-800 text-white text-center p-2 z-50 font-semibold font-mono">
      ⚠️ Koneksi Terputus. Memeriksa jaringan...
    </div>
  )
}

export default NetworkStatus
