import { CircleAlert, House, RotateCw } from 'lucide-react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import { Button } from '../ui/button'
import { JSX } from 'react'
import { isAppError } from '@renderer/lib/app-error'

function GlobalError(): JSX.Element {
  const error = useRouteError()
  const navigate = useNavigate()

  let errorMessage = 'Terjadi kesalahan yang tidak terduga.'
  let errorTitle = 'Oops! Ada Masalah'
  let errorCode = 'UNKNOWN'

  if (isRouteErrorResponse(error)) {
    console.log(error, 'error nih wkwk')
    errorCode = error.status.toString()
    if (error.status === 404) {
      errorTitle = 'Halaman Tidak Ditemukan'
      errorMessage = 'Halaman yang Anda cari tidak tersedia.'
    } else if (error.status === 401) {
      errorTitle = 'Akses Ditolak'
      errorMessage = 'Anda tidak memiliki izin untuk mengakses halaman ini.'
    } else {
      errorMessage = error.statusText
    }
  } else if (isAppError(error)) {
    errorCode = error.code
    errorMessage = error.message
  } else if (error instanceof Error) {
    errorMessage = error.message
    if (
      errorMessage.toLowerCase().includes('network') ||
      errorMessage.toLowerCase().includes('connection')
    ) {
      errorTitle = 'Koneksi Terputus'
      errorMessage = 'Tidak dapat menghubungi server kamera. Pastikan server lokal berjalan.'
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <CircleAlert className="h-12 w-12 text-red-600" aria-hidden="true" />
        </div>

        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{errorTitle}</h2>
          <p className="mt-2 rounded bg-gray-100 p-2 font-mono text-sm text-gray-500">
            Code: {errorCode} <br />
            Details: {errorMessage}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="cursor-pointer text-black"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Muat Ulang
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/', { replace: true })}
            className="cursor-pointer text-black"
          >
            <House /> Ke Beranda
          </Button>
        </div>

        {import.meta.env.DEV && error instanceof Error && (
          <details className="mt-4 cursor-pointer text-left text-xs text-red-500">
            <summary>Stack Trace</summary>
            <pre className="mt-2 overflow-auto rounded border border-red-100 bg-red-50 p-2">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}

export default GlobalError
