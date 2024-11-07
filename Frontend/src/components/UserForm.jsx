import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import UserContext from "../context/userContext";

UserForm.propTypes = {
  validated: PropTypes.bool,
};

export default function UserForm(props) {
  const [password, setPassword] = useState(""),
    [password2, setPassword2] = useState(""),
    { user } = useContext(UserContext),
    [userValues, setUserValues] = useState({});

  useEffect(() => {
    if (user) {
      setUserValues(user);
    }
  }, [user]);

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setUserValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Namn</Form.Label>
        <Form.Control
          required
          name="name"
          placeholder="För- och efternamn"
          value={userValues.userfullname || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>E-postadress</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="E-postadress"
          value={userValues.useremail || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Användarnamn</Form.Label>
        <Form.Control
          required
          name="username"
          placeholder="Användarnamn"
          value={userValues.userusername || ""}
          onChange={handleChange}
        />
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
