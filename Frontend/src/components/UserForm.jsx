import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import profileImage from "../assets/booklyOwl.webp";
import { useState } from "react";

export default function UserForm() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState(""),
    [password2, setPassword2] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form
      className="container p-3 my-5 d-flex flex-column w-25"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3 text-center">
        <Image
          className="mb-3"
          id="basic-nav-dropdown"
          src={profileImage}
          roundedCircle
          style={{ width: "100%" }}
        />
        <Button variant="light">Ändra profilbild</Button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Namn</Form.Label>
        <Form.Control required type="name" placeholder="För- och efternamn" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>E-postadress</Form.Label>
        <Form.Control required type="email" placeholder="E-postadress" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Användarnamn</Form.Label>
        <Form.Control required type="username" placeholder="Användarnamn" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Lösenord</Form.Label>
        <Form.Control
          required
          type="password"
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

      {validated && (
        <p className="mb-3 text-center text-danger">
          Vänligen fyll i samtliga fält
        </p>
      )}

      <Button variant="primary" type="submit">
        Skicka
      </Button>
    </Form>
  );
}
