import Footer from './components/Footer'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Bookshelf from './pages/Bookshelf'
import Settings from './pages/Settings'
import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom'

function MyComponent() {
  const router = createHashRouter([
    {
      children: [
        {
          element: <Home />,
          path: '/',
        },
        {
          element: <Bookshelf />,
          path: '/my-bookshelf',
        },
        {
          element: <Settings />,
          path: '/settings',
        },
      ],

      element: (
        <>
          <NavBar />
          <main className="min-vh-100">
            <Outlet />
          </main>
          <Footer />
        </>
      ),
    },
  ])

  return <RouterProvider router={router} />
}

export default MyComponent
