import { JSX } from 'react'
import { usePingCamera } from '../../hooks/useCamera'
import { Button } from '@renderer/components/ui/button'

function HomeIndex(): JSX.Element {
  const { data, isPending, isError, error, refetch } = usePingCamera()

  if (isPending) {
    return (
      <div className="loading-container">
        <div>Loading camera status...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex w-fit flex-col gap-2">
        <h2>Connection Error</h2>
        <p className="text-red-500">{error.message}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    )
  }

  if (!data?.success) {
    return (
      <div className="flex w-fit flex-col gap-2">
        <h2>Service Error</h2>
        <p className="text-red-500">{data?.error?.message || 'Unknown error'}</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="flex w-fit flex-col gap-2">
      <h1>Camera Status</h1>
      <div className="status-indicator success">● Connected</div>
      <pre>{JSON.stringify(data.data, null, 2)}</pre>
      <Button onClick={() => refetch()}>Refresh</Button>
    </div>
  )
}

export default HomeIndex
