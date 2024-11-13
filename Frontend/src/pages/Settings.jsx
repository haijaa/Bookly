import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import profileImage from '../assets/booklyOwl.webp'
import UserForm from '../components/UserForm'
import UserContext from '../context/UserContext'
import Modal from 'react-bootstrap/Modal'
import ToastNotification from '../components/ToastNotification'

export default function Settings() {
  const [validated, setValidated] = useState(false),
    { user, setUser } = useContext(UserContext),
    [userChanged, setUserChanged] = useState(false),
    [showDeleteModal, setShowDeleteModal] = useState(false),
    [showDeletedUser, setShowDeletedUser] = useState(false),
    [toastState, setToastState] = useState({ show: false }),
    [showPicturesModal, setShowPicturesModal] = useState(false),
    [selectedImage, setSelectedImage] = useState(''),
    images = [
      {
        profileImage:
          'https://images.unsplash.com/photo-1556566382-339e7b3e26a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzJTIwYW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        profileImage:
          'https://images.unsplash.com/photo-1516374348294-ce51573b0fb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3MlMjBhbmltYWxzfGVufDB8fDB8fHww',
      },
      {
        profileImage:
          'https://images.unsplash.com/photo-1708458664936-4cba4001c206?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3MlMjBkb2d8ZW58MHx8MHx8fDA%3D',
      },
    ]

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget,
      formData = new FormData(event.target),
      formValues = Object.fromEntries(formData.entries())
    console.log('formvalues: ', formValues)

    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
      changeUser(formValues)
      setUserChanged(!userChanged)
      setValidated(false)
    }
  }

  const changeUser = async (input) => {
    await fetch('/api/users', {
      body: JSON.stringify({
        userFullName: input.name,
        userUserName: input.username,
        userPassword: input.password,
        userEmail: input.email,
        userProfilePicture: selectedImage,
        userId: user.userid,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((result) => {
        setUser(result.user)
        setToastState({
          show: true,
          title: 'Uppdatera användare',
          message: `${input.name} har uppdaterats`,
        })
        setTimeout(() => {
          setToastState({ ...toastState, show: false })
        }, 3000)
      })
  }

  const changeProfilePicture = async () => {
    await fetch('/api/users', {
      body: JSON.stringify({
        userFullName: user.userfullname,
        userUserName: user.userusername,
        userProfilePicture: selectedImage,
        userEmail: user.useremail,
        userPassword: user.userpassword,
        userId: user.userid,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setUser(result.user)
        setShowPicturesModal(false)
        setToastState({
          show: true,
          title: 'Uppdatera användare',
          message: 'Din profilbild har uppdaterats',
        })
        setTimeout(() => {
          setToastState({ ...toastState, show: false })
        }, 3000)
      })
  }

  const deleteUser = async () => {
    await fetch('/api/users', {
      body: JSON.stringify({
        userId: user.userid,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setShowDeleteModal(false)
        setShowDeletedUser(true)
        setTimeout(() => {
          setUser(null)
        }, 3000)
      })
  }

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
            src={user.userprofilepicture ?? profileImage}
            roundedCircle
            style={{ width: '200px', height: '200px' }}
          />
          <Button variant="light" onClick={() => setShowPicturesModal(true)}>
            Ändra profilbild
          </Button>
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
      <Modal
        show={showPicturesModal}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title>Välj profilbild</Modal.Title>
        </Modal.Header>
        <Container>
          <Row className="mt-2">
            {images.map((img) => (
              <Col key={img.profileImage} xs={6} md={4}>
                <Image
                  role="button"
                  src={img.profileImage}
                  roundedCircle
                  className={`chosen-img ${
                    selectedImage === img.profileImage ? 'selected' : ''
                  }`}
                  cover
                  style={{
                    width: '140px',
                    height: '140px',
                    border:
                      selectedImage === img.profileImage
                        ? '3px solid var(--primary-color)'
                        : 'none',
                  }}
                  onClick={() => setSelectedImage(img.profileImage)}
                />
              </Col>
            ))}
          </Row>
        </Container>

        <Modal.Footer>
          <Button variant="light" onClick={() => setShowPicturesModal(false)}>
            Avbryt
          </Button>
          <Button className="btn-primary" onClick={changeProfilePicture}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
