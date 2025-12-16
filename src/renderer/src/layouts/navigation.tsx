import { Outlet, Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
      <nav className="flex items-center gap-4 justify-center p-4 bg-gray-100 mb-3">
        <Link to="/">Home</Link> | <Link to="/live-capture">Capture</Link> |{' '}
        <Link to="/settings">Settings</Link>
      </nav>

      <main>
        {/* Outlet adalah tempat halaman-halaman (children) dirender */}
        <Outlet />
      </main>
    </div>
  )
}

export default Navigation
