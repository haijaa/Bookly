import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import profileImage from "../assets/booklyOwl.webp";
import UserForm from "../components/UserForm";

export default function Settings() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget,
      formData = new FormData(event.target),
      formValues = Object.fromEntries(formData.entries());
    console.log("formvalues: ", formValues);

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  return (
    <Form
      className="container p-3 d-flex flex-column w-25"
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

      <UserForm validated={validated} />

      <Button variant="primary" type="submit">
        Skicka
      </Button>
    </Form>
  );
}
