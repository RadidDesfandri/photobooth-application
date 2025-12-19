import Loading from '@renderer/components/loading'
import React, { Suspense } from 'react'

function Loadable(Component: React.ComponentType): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

export default Loadable
