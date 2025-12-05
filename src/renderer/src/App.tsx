import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

function App(): React.JSX.Element {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      const result = await window.api.fetchUsers()

      if (result.success && result.data) {
        setUsers(result.data)
      } else {
        setError(result.error || 'Failed to fetch users')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">User List (via IPC)</h1>

        <Button onClick={fetchUsers} variant="destructive" className="mb-4">
          Refresh
        </Button>

        {loading && <p className="text-gray-600">Loading...</p>}

        {error && <p className="text-red-500 bg-red-50 p-4 rounded">Error: {error}</p>}

        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">📧 {user.email}</p>
              <p className="text-gray-600">📱 {user.phone}</p>
              <p className="text-gray-600">🌐 {user.website}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
