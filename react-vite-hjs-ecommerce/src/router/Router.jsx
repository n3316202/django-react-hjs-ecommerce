import Cart from '@/ui/components/fruits/Cart';
import Products from '@/ui/components/fruits/Products';
import Hero from '@/ui/components/Hero';
import Login from '@/ui/components/login/Login';
import MainLayout from '@/ui/layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    loader: () => '메인 레이아웃',
    children: [
      {
        path: '', // 기본 경로: / => Products
        element: <div><Hero/><Products /></div>,
        loader: () => '상품들',
      },
      {
        path: 'login', 
        element: <div><Hero/><Login /></div>,
        loader: () => '로그인',
      },
      {
        path: 'cart', //카트 페이지
        element: <Cart />,
        loader: () => '카트',
      },
    ],
  },
];

const router = createBrowserRouter(routes)

export { router, routes }