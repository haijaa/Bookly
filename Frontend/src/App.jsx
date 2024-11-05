import Login from "./components/LoginForm";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AllBooks from "./components/AllBooks";

function MyComponent() {
  return (
    <>
      <NavBar />
      <main className="min-vh-100">
        <Login />
      </main>
      <Footer />
    </>
  );
}

export default MyComponent;
