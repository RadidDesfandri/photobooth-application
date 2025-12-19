import NetworkStatus from '@renderer/components/network-status'
import { Navigation } from 'lucide-react'
import React from 'react'

function RootWrapper(): React.JSX.Element {
  return (
    <>
      <NetworkStatus />
      <Navigation />
    </>
  )
}

export default RootWrapper
