import { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'

const mappingToTitle = {
  '': 'Home',
  'live-capture': 'Live Capture',
  tes: 'Testing Page'
}

const Navigation = (): JSX.Element => {
  const location = useLocation()

  return (
    <nav className="mb-3 flex items-center justify-between bg-neutral-900 p-4 px-8 text-white shadow-md">
      <h1 className="text-3xl font-medium">
        {mappingToTitle[location.pathname.split('/')[1]] || 'Unknown Page'}
      </h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/live-capture">Live Capture</Link>
        <Link to="/tes">Tes</Link>
      </div>
    </nav>
  )
}

export default Navigation
