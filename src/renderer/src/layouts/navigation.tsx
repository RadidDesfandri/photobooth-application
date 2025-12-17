import { JSX } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const mappingToTitle = {
  '': 'Home',
  'live-capture': 'Live Capture'
}

const Navigation = (): JSX.Element => {
  const location = useLocation()

  return (
    <div>
      <nav className="flex items-center justify-between px-8 p-4 mb-3 bg-neutral-900 text-white shadow-md">
        <h1 className="font-medium text-3xl">
          {mappingToTitle[location.pathname.split('/')[1]] || 'Unknown Page'}
        </h1>

        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/live-capture">Live Capture</Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Navigation
