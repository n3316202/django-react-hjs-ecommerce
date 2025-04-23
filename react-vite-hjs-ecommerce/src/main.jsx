import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router/Router'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'


createRoot(document.getElementById('root')).render(
  //dev_1_Fruit
  //dev_5_Fruit
  <AuthProvider>
    <RouterProvider router={router} />,
  </AuthProvider>
)
