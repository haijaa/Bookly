import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Bookshelf from "./pages/Bookshelf";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import SingleBook from "./components/SingleBooks";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function MyComponent() {
  const { user } = useContext(UserContext);

  const router = createHashRouter([
    {
      children: [
        {
          element: <Home />,
          path: "/",
        },
        {
          element: <SingleBook />,
          path: "/books/:paramId",
        },
        {
          element: <Login />,
          path: "/login",
        },
        {
          element: <Bookshelf />,
          path: "/my-bookshelf",
        },
        {
          element: <Settings />,
          path: "/settings",
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
  ]);

  return <RouterProvider router={router} />;
}

export default MyComponent;
