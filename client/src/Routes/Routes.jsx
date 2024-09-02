import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import WeOfferSingle from '../pages/Outlet/WeOffer/WeOfferSingle'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/offer/:id',
        element: <WeOfferSingle></WeOfferSingle>,
        loader: ({params}) => fetch (`${import.meta.env.VITE_API_URL}/getofferbyid/${params.id}`)
      }
      
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
