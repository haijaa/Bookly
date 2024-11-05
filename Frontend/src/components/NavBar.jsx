import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import profileImage from '../assets/booklyOwl.webp'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#606D5D' }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Bookly
        </Navbar.Brand>
        <Nav className="d-flex justify-content-between">
          <span className="d-flex flex-row">
            <Nav.Link as={NavLink} to="/">
              Alla böcker
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-bookshelf">
              Min bokhylla
            </Nav.Link>
          </span>
          <div className="vr m-auto ms-3 me-3" />
          <span>
            <NavDropdown
              className="me-auto flex-grow-1 flex-end"
              title={
                <span>
                  Joe Doe
                  <Image
                    id="basic-nav-dropdown"
                    src={profileImage}
                    roundedCircle
                    style={{ width: '30px', margin: '0 10px' }}
                  />
                </span>
              }
            >
              <NavDropdown.Item as={NavLink} to="/settings">
                Inställningar
              </NavDropdown.Item>
              <NavDropdown.Item href="#log-out">Logga ut</NavDropdown.Item>
            </NavDropdown>
          </span>
        </Nav>
      </Container>
    </Navbar>
  )
}
