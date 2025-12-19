import { useQuery } from '@tanstack/react-query'

export const useUser = (): ReturnType<typeof useQuery> => {
  return useQuery({
    queryKey: ['users'], // Key unik untuk cache
    queryFn: async () => {
      // 1. Panggil API dari preload (window.api)
      const response = await window.api.fetchUsers()

      // 2. Cek apakah IPC mengembalikan success: false
      // TanStack Query butuh kita men-throw Error agar statusnya jadi 'isError'
      if (!response.success) {
        throw new Error(response.error || 'Terjadi kesalahan saat mengambil data')
      }

      // 3. Kembalikan data murninya saja ke komponen
      return response.data
    }
  })
}
