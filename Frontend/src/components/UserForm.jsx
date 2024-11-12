import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import UserContext from "../context/UserContext";
import "../index.css";

UserForm.propTypes = {
  validated: PropTypes.bool,
  changedUser: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default function UserForm(props) {
  const [password, setPassword] = useState(""),
    [password2, setPassword2] = useState(""),
    { user } = useContext(UserContext),
    [userName, setUserName] = useState(""),
    [userFullName, setUserFullName] = useState(""),
    [userEmail, setUserEmail] = useState(""),
    [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.userusername);
      setUserFullName(user.userfullname);
      setUserEmail(user.useremail);
    }
  }, [user]);

  useEffect(() => {
    setPassword("");
    setPassword2("");
    setError(props.errorMessage || "");
  }, [props.changedUser, props.errorMessage]);

  const handleChangeEmail = (e) => {
    setUserEmail(e.target.value);
    if (props.errorMessage && props.errorMessage.includes("Emailen")) {
      setError("");
    }
  };

  const handleChangeUsername = (e) => {
    setUserName(e.target.value);
    if (props.errorMessage && props.errorMessage.includes("Användarnamn")) {
      setError("");
    }
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Namn</Form.Label>
        <Form.Control
          required
          name="name"
          placeholder="För- och efternamn"
          value={userFullName}
          onChange={(e) => setUserFullName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>E-postadress</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="E-postadress"
          value={userEmail}
          onChange={handleChangeEmail}
          isInvalid={error && error.includes("Emailen")}
        />
        {error && error.includes("Emailen") && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Användarnamn</Form.Label>
        <Form.Control
          required
          name="username"
          placeholder="Användarnamn"
          value={userName}
          onChange={handleChangeUsername}
          isInvalid={error && error.includes("Användarnamn")}
        />
        {error && error.includes("Användarnamn") && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lösenord</Form.Label>
        <Form.Control
          required
          type="password"
          name="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upprepa lösenord</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Upprepa lösenord"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          isInvalid={password !== password2}
        />
        <Form.Control.Feedback type="invalid">
          Lösenorden matchar inte
        </Form.Control.Feedback>
      </Form.Group>

      {props.validated && (
        <p className="mb-3 text-center text-danger">
          Vänligen fyll i samtliga fält
        </p>
      )}
    </>
  );
}
