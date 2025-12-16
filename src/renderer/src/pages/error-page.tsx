import { Button } from '@renderer/components/ui/button'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

function ErrorPage() {
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
    console.error(error)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-red-50 text-red-900 p-10">
      <h1 className="text-4xl font-bold mb-4">Oops! Terjadi Masalah</h1>
      <p className="text-lg mb-6">Maaf, aplikasi mengalami gangguan.</p>

      <div className="bg-white p-4 rounded shadow mb-6 border border-red-200">
        <code className="text-red-600 font-mono">{errorMessage}</code>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()}>Reload App</Button>

        <Button asChild variant="outline">
          <Link to="/">Kembali ke Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
