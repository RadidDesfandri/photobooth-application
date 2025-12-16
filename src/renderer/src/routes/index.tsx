import Loading from '@renderer/components/loading'
import NetworkStatus from '@renderer/components/network-status'
import ProtectedRoute from '@renderer/components/protected-route'
import Navigation from '@renderer/layouts/navigation'
import ErrorPage from '@renderer/pages/error-page'
import { lazy, Suspense } from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'

const Home = lazy(() => import('../pages/home/home.index'))
const Capture = lazy(() => import('../pages/capture/capture.index'))
const Login = lazy(() => import('../pages/login/login.index'))
const Register = lazy(() => import('../pages/register/register.index'))

const Loadable = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

const RootWrapper = () => (
  <>
    <NetworkStatus />
    <Navigation />
  </>
)

// Define the routes using createHashRouter
const router = createHashRouter([
  {
    path: '/',
    element: <RootWrapper />,
    errorElement: <ErrorPage />,
    children: [
      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: Loadable(Home)
          },
          {
            path: 'live-capture',
            element: Loadable(Capture)
          }
        ]
      },

      // Public routes
      {
        path: 'login',
        element: Loadable(Login)
      },
      {
        path: 'register',
        element: Loadable(Register)
      },

      // Redirect kalau halaman tidak ditemukan
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
])

export default router
