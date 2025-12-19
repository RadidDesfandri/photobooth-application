import { JSX } from 'react'
import { usePingCamera } from '../../hooks/useCamera'

function HomeIndex(): JSX.Element {
  const { data, isPending, isError } = usePingCamera()

  return <div>{isPending ? 'Loading...' : isError ? 'Error' : (data as string) || ''}</div>
}

export default HomeIndex
