import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import profileImage from "../assets/booklyOwl.webp";
import UserForm from "../components/UserForm";
import UserContext from "../context/userContext";
import Modal from "react-bootstrap/Modal";
import ToastNotification from "../components/ToastNotification";

export default function Settings() {
  const [validated, setValidated] = useState(false),
    { user, setUser } = useContext(UserContext),
    [userChanged, setUserChanged] = useState(false),
    [showDeleteModal, setShowDeleteModal] = useState(false),
    [showDeletedUser, setShowDeletedUser] = useState(false),
    [toastState, setToastState] = useState({ show: false });

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
        setUser(result.user);
        setToastState({
          show: true,
          title: "Uppdatera användare",
          message: `${input.name} har uppdaterats`,
        });
        setTimeout(() => {
          setToastState({ ...toastState, show: false });
        }, 3000);
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
        setShowDeleteModal(false);
        setShowDeletedUser(true);
        setTimeout(() => {
          setUser(null);
        }, 3000);
      });
  };

  return (
    <>
      <ToastNotification
        show={toastState.show}
        title={toastState.title}
        message={toastState.message}
        onClose={() => setToastState({ ...toastState, show: false })}
      />
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
          Uppdatera användare
        </Button>

        <Button
          variant="danger"
          onClick={() => setShowDeleteModal(true)}
          className="mt-3"
        >
          Ta bort användare
        </Button>

        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Ta bort {user.userfullname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Är du säker på att du vill ta bort {user.userfullname}? Observera
            att detta beslut är permanent och kan inte återkallas
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowDeleteModal(false)}>
              Avbryt
            </Button>
            <Button variant="danger" onClick={deleteUser}>
              Ta bort användare
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showDeletedUser}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>{user.userfullname} har tagits bort</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Du kommer att omdirigeras till startsidan om några sekunder
          </Modal.Body>
        </Modal>
      </Form>
    </>
  );
}
