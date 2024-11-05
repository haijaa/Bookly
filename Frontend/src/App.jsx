import Login from "./components/LoginForm";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import UserForm from "./components/UserForm";

function MyComponent() {
  return (
    <>
      <NavBar />
      <main className="min-vh-100">
        <Login />
        <UserForm />
      </main>
      <Footer />
    </>
  );
}

export default MyComponent;
