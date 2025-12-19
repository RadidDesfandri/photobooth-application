import { JSX } from 'react'
import { usePingCamera } from '../../hooks/useCamera'

function HomeIndex(): JSX.Element {
  const { data, isPending } = usePingCamera()

  return <div>{isPending ? 'Loading...' : (data as string) || ''}</div>
}

export default HomeIndex
