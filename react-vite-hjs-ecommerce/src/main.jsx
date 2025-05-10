import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router/Router'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import { PaginationProvider } from './contexts/PaginationContext'


createRoot(document.getElementById('root')).render(
  //dev_1_Fruit
  //dev_5_Fruit
  //dev_6_Fruit
  //dev_10_4_Fruit <PaginationProvider>
  <AuthProvider>
    <PaginationProvider>
      <CartProvider>
          <RouterProvider router={router} />,
      </CartProvider>
    </PaginationProvider>
  </AuthProvider>
)
