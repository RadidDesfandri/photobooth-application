import { Button } from '@renderer/components/ui/button'
import { JSX } from 'react'
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'

function ErrorPage(): JSX.Element {
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
    <div className="flex h-screen w-full flex-col items-center justify-center bg-red-50 p-10 text-red-900">
      <h1 className="mb-4 text-4xl font-bold">Oops! Terjadi Masalah</h1>
      <p className="mb-6 text-lg">Maaf, aplikasi mengalami gangguan.</p>

      <div className="mb-6 rounded border border-red-200 bg-white p-4 shadow">
        <code className="font-mono text-red-600">{errorMessage}</code>
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
