import GlobalError from '@renderer/components/common/global-error'
import ProtectedRoute from '@renderer/components/protected-route'
import Loadable from '@renderer/layouts/loadable'
import RootWrapper from '@renderer/layouts/root-wrapper'
import { lazy } from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'

const Home = lazy(() => import('../pages/home/home.index'))
const Capture = lazy(() => import('../pages/capture/capture.index'))
const Login = lazy(() => import('../pages/login/login.index'))
const Register = lazy(() => import('../pages/register/register.index'))
const TesIndex = lazy(() => import('../pages/tes.index'))
const CameraControl = lazy(() => import('../pages/camera-control.index'))

// Define the routes using createHashRouter
const router = createHashRouter([
  {
    path: '/',
    element: <RootWrapper />,
    errorElement: <GlobalError />,
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
      {
        path: 'tes',
        element: Loadable(TesIndex)
      },
      {
        path: 'camera-control',
        element: Loadable(CameraControl)
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
