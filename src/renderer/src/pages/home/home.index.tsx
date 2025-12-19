import { JSX } from 'react'
import { usePingCamera } from '../../hooks/useCamera'

function HomeIndex(): JSX.Element {
  const { data, isPending, isError, error } = usePingCamera()

  if (isPending) return <div>Loading...</div>

  if (isError || !data) return <div>Ada error {error.message}</div>

  if (!data.success) {
    return <div>Error: {data.error?.message}</div>
  }

  return (
    <div>
      <h1>Camera Status</h1>
      <pre>{data.data}</pre>
    </div>
  )
}

export default HomeIndex
