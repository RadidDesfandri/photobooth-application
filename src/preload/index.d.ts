import { ElectronAPI } from '@electron-toolkit/preload'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

interface FetchUsersResponse {
  success: boolean
  data?: User[]
  error?: string
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      fetchUsers: () => Promise<FetchUsersResponse>
    }
  }
}
