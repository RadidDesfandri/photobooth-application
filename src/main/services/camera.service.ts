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

const handleFetchUsers = async (): Promise<FetchUsersResponse> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export { handleFetchUsers }
