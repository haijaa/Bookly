import { Accordion } from 'react-bootstrap'
import Footer from './components/Footer'

function MyComponent() {
  return (
    <>
      <main className="min-vh-100">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Antons</Accordion.Header>
            <Accordion.Body>Antons låda</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Majas</Accordion.Header>
            <Accordion.Body>Majas låda</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Frida</Accordion.Header>
            <Accordion.Body>Fridas låda</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </main>
      <Footer />
    </>
  )
}

export default MyComponent
