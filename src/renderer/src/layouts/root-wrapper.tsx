import NetworkStatus from '@renderer/components/network-status'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './navigation'

function RootWrapper(): React.JSX.Element {
  return (
    <>
      <NetworkStatus />
      <Navigation />
      <Outlet />
    </>
  )
}

export default RootWrapper
