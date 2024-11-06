import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Bookshelf from "./pages/Bookshelf";
import Settings from "./pages/Settings";
import Login from "./components/LoginForm";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import SingleBook from "./components/SingleBooks";

function MyComponent() {
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

      element: (
        <>
          <NavBar />
          <main className="min-vh-100" style={{ backgroundColor: "#F2E9DC" }}>
            <Outlet />
          </main>
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default MyComponent;
