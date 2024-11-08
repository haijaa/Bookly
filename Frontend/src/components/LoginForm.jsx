import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./UserForm";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserContext from "../context/userContext";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState("login"),
    [validateRegister, setValidateRegister] = useState(false),
    [validateLogin, setValidateLogin] = useState(false),
    [conditions, setConditions] = useState(false),
    { setUser } = useContext(UserContext);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const form = event.currentTarget,
      formData = new FormData(event.target),
      formValues = Object.fromEntries(formData.entries());

    console.log(formValues);

    if (form.checkValidity() === false) {
      setValidateRegister(true);
    } else {
      createUser(formValues);
      setValidateRegister(false);
    }
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const form = event.currentTarget,
      formData = new FormData(event.target),
      formValues = Object.fromEntries(formData.entries());

    fetchUser(formValues);

    if (form.checkValidity() === false) {
      setValidateLogin(true);
    } else {
      setValidateLogin(false);
    }
  };

  const fetchUser = async (input) => {
    await fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((result) => {
        const foundUser = result.find(
          (user) =>
            user.userusername === input.username &&
            user.userpassword === input.password
        );

        if (foundUser) {
          setUser(foundUser);
        }
      });
  };

  const createUser = async (input) => {
    await fetch("http://localhost:3000/api/users", {
      body: JSON.stringify({
        userFullName: input.name,
        userUserName: input.username,
        userPassword: input.password,
        userEmail: input.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result.user);
      });
  };

  return (
    <div className="container p-3 d-flex flex-column w-25">
      <h1 className="text-center m-5 emilys-candy-regular pb-5">Bookly</h1>
      <ul className="nav nav-pills mb-3 d-flex flex-row justify-content-between">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === "login" ? "active" : ""
            } link-start`}
            onClick={() => handleTabClick("login")}
          >
            Logga in
          </button>
        </li>
        <li className="nav-item ">
          <button
            className={`nav-link ${
              activeTab === "register" ? "active" : ""
            } link-start`}
            onClick={() => handleTabClick("register")}
          >
            Registrera ny användare
          </button>
        </li>
      </ul>

      {activeTab === "login" && (
        <>
          <Form
            className="d-flex flex-column mt-4"
            noValidate
            validated={validateLogin}
            onSubmit={handleSubmitLogin}
          >
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Användarnamn</Form.Label>
              <Form.Control
                required
                type="username"
                name="username"
                placeholder="Användarnamn"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Lösenord"
              />
            </Form.Group>

            {validateLogin && (
              <p className="mb-3 text-center text-danger">
                Vänligen skriv in användarnamn och lösenord
              </p>
            )}

            <Button className="mb-4 mt-4" type="submit" variant="primary">
              Logga in
            </Button>
          </Form>
          <p className="text-center">
            Har du inget konto?
            <a
              className="text-primary hover ps-3"
              onClick={() => handleTabClick("register")}
            >
              Registrera dig
            </a>
          </p>
        </>
      )}

      {activeTab === "register" && (
        <Form
          className="d-flex flex-column mt-4"
          noValidate
          validated={validateRegister}
          onSubmit={handleSubmitRegister}
        >
          <UserForm validated={validateRegister} />

          <div className="d-flex justify-content-center mb-4">
            <input
              className="me-3"
              type="checkbox"
              id="agreeTerms"
              value={conditions}
              onChange={() => setConditions(!conditions)}
            />
            <label htmlFor="agreeTerms">
              Jag har läst och accepterat användarvillkoren
            </label>
          </div>

          <Button
            className="mt-4"
            variant="primary"
            type="submit"
            disabled={!conditions}
          >
            Skapa användare
          </Button>
        </Form>
      )}
    </div>
  );
}
