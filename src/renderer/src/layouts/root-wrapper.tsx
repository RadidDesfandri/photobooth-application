import NetworkStatus from '@renderer/components/network-status'
import React from 'react'
import { Outlet } from 'react-router-dom'

function RootWrapper(): React.JSX.Element {
  return (
    <>
      <NetworkStatus />
      <Outlet />
    </>
  )
}

export default RootWrapper
