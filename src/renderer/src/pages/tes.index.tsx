import { Button } from '@renderer/components/ui/button'
import { useCameraStatus, usePingCamera } from '@renderer/hooks/useCamera'
import { cn } from '@renderer/lib/utils'
import { AlertCircle, CheckCircle, Clock, RefreshCw, XCircle, Zap } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TesIndex(): React.JSX.Element {
  const [selectedApi, setSelectedApi] = useState('ping')
  const navigate = useNavigate()

  const pingResult = usePingCamera()
  const statusResult = useCameraStatus()

  const apiList = [
    { id: 'ping', name: 'Ping Camera', method: 'GET', hook: pingResult },
    { id: 'connect', name: 'Connect Camera', method: 'POST', hook: null },
    { id: 'disconnect', name: 'Disconnect Camera', method: 'POST', hook: null },
    { id: 'status', name: 'Get Camera Status', method: 'GET', hook: statusResult },
    { id: 'capture', name: 'Capture Image', method: 'POST', hook: null },
    { id: 'liveview/start', name: 'Start Liveview', method: 'POST', hook: null },
    { id: 'liveview/stop', name: 'Stop Liveview', method: 'POST', hook: null },
    { id: 'liveview/frame', name: 'Get Liveview Frame', method: 'GET', hook: null }
  ]

  // const currentApi = useMemo(() => {
  //   return apiList.find((api) => api.id === selectedApi)
  // }, [selectedApi])

  const currentApi = apiList.find((api) => api.id === selectedApi)

  const { data, refetch, error, isError, isPending } = currentApi?.hook || {
    data: null,
    refetch: () => {},
    error: null,
    isError: false,
    isPending: false
  }

  const getMethodColor = (method: string): string => {
    const colors: Record<string, string> = {
      GET: 'bg-blue-100 text-blue-700',
      POST: 'bg-green-100 text-green-700',
      PUT: 'bg-yellow-100 text-yellow-700',
      DELETE: 'bg-red-100 text-red-700'
    }
    return colors[method] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-slate-900">API Testing Dashboard</h1>
            </div>
            <Button onClick={() => navigate('/')} variant="link" className="bg-background">
              Back to home
            </Button>
          </div>
          <p className="text-slate-600">Test dan monitor semua API endpoints dalam satu tempat</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* API Selection Panel */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Available APIs</h2>
              <div className="space-y-2">
                {apiList.map((api) => (
                  <button
                    key={api.id}
                    onClick={() => setSelectedApi(api.id)}
                    disabled={!api.hook}
                    className={`w-full cursor-pointer rounded-lg border px-4 py-3 text-left transition-all ${
                      selectedApi === api.id
                        ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    } ${!api.hook ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{api.name}</span>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${getMethodColor(api.method)}`}
                      >
                        {api.method}
                      </span>
                    </div>
                    {!api.hook && (
                      <span className="mt-1 block text-xs text-slate-500">Coming soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Pending</span>
                  <span
                    className={`font-medium ${isPending ? 'text-yellow-600' : 'text-slate-400'}`}
                  >
                    {isPending ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Has Error</span>
                  <span className={`font-medium ${isError ? 'text-red-600' : 'text-slate-400'}`}>
                    {isError ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Has Data</span>
                  <span className={`font-medium ${data ? 'text-green-600' : 'text-slate-400'}`}>
                    {data ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testing Panel */}
          <div className="space-y-6 lg:col-span-2">
            {/* Test Controls */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Test Configuration</h2>
                <Button disabled={isPending || !currentApi?.hook} onClick={() => refetch()}>
                  <RefreshCw className={cn('h-4 w-4', isPending ? 'animate-spin' : '')} />
                  {isPending ? 'Testing...' : 'Run Test'}
                </Button>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600">Endpoint:</span>
                  <code className="rounded bg-slate-900 px-3 py-1 text-sm text-slate-100">
                    /api/{selectedApi}
                  </code>
                </div>
              </div>
            </div>

            {/* Response Panel */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Response</h2>

              {!data && !isPending && (
                <div className="py-12 text-center text-slate-400">
                  <Clock className="mx-auto mb-3 h-12 w-12 opacity-50" />
                  <p>Tekan &quot;Run Test&quot; untuk memulai testing</p>
                </div>
              )}

              {isPending && (
                <div className="py-12 text-center">
                  <RefreshCw className="mx-auto mb-3 h-12 w-12 animate-spin text-indigo-600" />
                  <p className="text-slate-600">Sedang menjalankan test...</p>
                </div>
              )}

              {data && data.success && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-green-600">Success</span>
                        <span className="rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
                          200 OK
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-slate-700">Response Data:</h3>
                    <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
                      {JSON.stringify(data.data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {data && !data.success && data.error && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-red-600">Failed</span>
                        <span className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                          {data.error.code}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-slate-700">Error Details:</h3>
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                        <div>
                          <p className="mb-1 text-sm font-medium text-red-800">
                            Code: {data.error.code}
                          </p>
                          <p className="text-sm text-red-600">{data.error.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-slate-700">Full Response:</h3>
                    <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                    <div>
                      <p className="mb-1 text-sm font-medium text-red-800">Request Error</p>
                      <p className="text-sm text-red-600">{error.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TesIndex
