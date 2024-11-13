import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom'
import { useContext, lazy, Suspense } from 'react'
import { UserContext } from './context/UserContext'

const Home = lazy(() => import('./pages/Home.jsx'))
const SingleBook = lazy(() => import('./pages/SingleBooks.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))

function MyComponent() {
  const { user } = useContext(UserContext)

  const router = createHashRouter([
    {
      children: [
        {
          element: (
            <Suspense fallback={<p>Laddar...</p>}>
              <Home />
            </Suspense>
          ),
          path: '/',
        },
        {
          element: (
            <Suspense fallback={<p>Laddar...</p>}>
              <SingleBook />
            </Suspense>
          ),
          path: '/books/:paramId',
        },
        {
          element: (
            <Suspense fallback={<p>Laddar...</p>}>
              <Login />
            </Suspense>
          ),
          path: '/login',
        },

        {
          element: (
            <Suspense fallback={<p>Laddar...</p>}>
              <Settings />
            </Suspense>
          ),
          path: '/settings',
        },
      ],

      element: user ? (
        <>
          <NavBar />
          <main className="min-vh-100 beige-background">
            <Outlet />
          </main>
          <Footer />
        </>
      ) : (
        <Login />
      ),
    },
  ])

  return <RouterProvider router={router} />
}

export default MyComponent
