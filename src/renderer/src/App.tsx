import { Button } from './components/ui/button'
import { useUser } from './hooks/useUser'

function App(): React.JSX.Element {
  const { refetch, data: users, isPending, isError, error } = useUser()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">User List (via IPC)</h1>

        {isError && (
          <div className="text-red-500">
            <p>Error: {error instanceof Error ? error.message : 'Gagal load'}</p>
            <Button onClick={() => refetch()} variant="destructive" className="mb-4">
              Coba lagi
            </Button>
          </div>
        )}

        {isPending && <p className="text-gray-600">Loading...</p>}

        <div className="grid gap-4">
          {users?.map((user) => (
            <div key={user.id} className="rounded bg-white p-4 shadow">
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
