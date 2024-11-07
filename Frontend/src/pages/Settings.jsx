import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import profileImage from "../assets/booklyOwl.webp";
import UserForm from "../components/UserForm";
import UserContext from "../context/userContext";

export default function Settings() {
  const [validated, setValidated] = useState(false),
    { user, setUser } = useContext(UserContext),
    [userChanged, setUserChanged] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget,
      formData = new FormData(event.target),
      formValues = Object.fromEntries(formData.entries());
    console.log("formvalues: ", formValues);

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      changeUser(formValues);
      setUserChanged(!userChanged);
      setValidated(false);
    }
  };

  const changeUser = async (input) => {
    await fetch("http://localhost:3000/api/users", {
      body: JSON.stringify({
        userFullName: input.name,
        userUserName: input.username,
        userPassword: input.password,
        userEmail: input.email,
        userProfilePicture: null,
        userId: user.userid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("user", user);
        console.log(result);
        setUser(result.user);
      });
  };

  const deleteUser = async () => {
    await fetch("http://localhost:3000/api/users", {
      body: JSON.stringify({
        userId: user.userid,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setUser(null);
      });
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

      <UserForm validated={validated} changedUser={userChanged} />

      <Button variant="primary" type="submit">
        Skicka
      </Button>

      <Button variant="danger" onClick={deleteUser}>
        Ta bort användare
      </Button>
    </Form>
  );
}
