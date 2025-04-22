import MainPage from '@/ui/pages/MainPage'
import { createBrowserRouter } from 'react-router-dom'



const routes = [
  {
    path: '/',
    element: <MainPage />,
    loader: () => '메인페이지',
  },
]

const router = createBrowserRouter(routes)

export { router, routes }