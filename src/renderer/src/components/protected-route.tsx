import { JSX } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// Example hook untuk mengecek autentikasi
const useAuth = (): boolean => {
  const user = { loggedIn: true }
  return user && user.loggedIn
}

function ProtectedRoute(): JSX.Element {
  const isAuth = useAuth()
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
