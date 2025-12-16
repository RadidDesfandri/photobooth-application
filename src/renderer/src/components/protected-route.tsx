import { Navigate, Outlet, useLocation } from 'react-router-dom'

// Example hook untuk mengecek autentikasi
const useAuth = () => {
  const user = { loggedIn: false } // Ganti logic ini nanti
  return user && user.loggedIn
}

function ProtectedRoute() {
  const isAuth = useAuth()
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
