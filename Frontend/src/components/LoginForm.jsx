import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserContext from "../context/UserContext";
import DataProtectionPolicy from "./DataProtectionPolicy";
import UserForm from "./UserForm";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState("login"),
    [validateRegister, setValidateRegister] = useState(false),
    [validateLogin, setValidateLogin] = useState(false),
    [conditions, setConditions] = useState(false),
    [showGDPRModal, setShowGDPRModal] = useState(false),
    { setUser } = useContext(UserContext),
    [errorMessage, setErrorMessage] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setErrorMessage("");
    setConditions(false);
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const form = event.currentTarget,
      formData = new FormData(event.target),
      formValues = Object.fromEntries(formData.entries());

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
    try {
      const response = await fetch("http://localhost:3000/api/users", {
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
      });
      const result = await response.json();
      if (response.ok) {
        setUser(result.user);
      } else {
        if (result.message === "användarnamn") {
          setErrorMessage(result.error);
        } else if (result.message === "email") {
          setErrorMessage(result.error);
        } else {
          console.log(result.error);
        }
      }
    } catch (error) {
      console.log("Error during user creation:", error);
    }
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
          <UserForm validated={validateRegister} errorMessage={errorMessage} />

          <div className="d-flex justify-content-center mb-4">
            <input
              className="me-3"
              type="checkbox"
              value={conditions}
              onChange={() => setConditions(!conditions)}
            />
            <label>
              Jag har läst och accepterat{" "}
              <a
                className="text-primary hover ps-3"
                onClick={() => setShowGDPRModal(true)}
              >
                användarvillkoren
              </a>
            </label>
          </div>

          <Button
            className="mt-4"
            variant="primary"
            type="submit"
            disabled={conditions === false}
          >
            Skapa användare
          </Button>

          <DataProtectionPolicy
            showModal={showGDPRModal}
            onClose={() => setShowGDPRModal(false)}
          />
        </Form>
      )}
    </div>
  );
}
