import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

DataProtectionPolicy.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default function DataProtectionPolicy({ showModal, onClose }) {
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Integritetsskyddspolicy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Vi behöver spara och behandla personuppgifter om dig, så som för-och
          efternamn, användarnamn och e-postadress. Syftet med en sådan
          behandling är för att användaren ska kunna skapa ett individuellt
          inloggningskonto och få en personlig användarupplevelse genom att ta
          del av Booklys community och kunna recensera böcker.
        </p>
        <p>
          Vi har fått dina uppgifter från dig när du registrerade ett
          inloggningskonto hos Bookly. Tillhandahållande av personuppgifterna är
          inte ett lagstadgat krav men observera att du behöver ange
          personuppgifter för att kunna skapa ett inloggningskonto på Bookly. Vi
          tillämpar vid var tid gällande integritetslagstiftning vid all
          behandling av personuppgifter. Den rättsliga grunden för att behandla
          dina personuppgifter är samtycke. Du har när som helst rätt att
          återkalla ditt samtycke till behandlingen. Ett återkallande påverkar
          inte lagligheten av behandlingen innan samtycket återkallades. Du kan
          återkalla ditt samtycke genom att radera ditt konto via
          Inställningar-fliken. Dina uppgifter kommer att sparas så länge du har
          ett konto hos oss och kommer raderas när du tar bort ditt konto.
        </p>

        <p>
          De personuppgifter vi behandlar om dig delas med Bookly. Vi kan även
          komma att dela dina personuppgifter med en tredje part, förutsatt att
          vi är skyldiga att göra så enligt lag. Däremot kommer vi aldrig att
          överföra dina uppgifter till ett land utanför EU.
        </p>

        <h2 style={{ fontSize: '20px' }}>
          Personuppgiftsansvariga/dataskyddsombud är:
        </h2>

        <ul>
          <li>Anton Karlsson, Ebbe Lieberathsgatan 18C, 412 83 Göteborg</li>
          <li>Frida Wikman, Ebbe Lieberathsgatan 18C, 412 83 Göteborg</li>
          <li>Maja Lennevi, Ebbe Lieberathsgatan 18C, 412 83 Göteborg</li>
        </ul>

        <p>
          Du har rätt att kontakta oss om du vill ha ut information om de
          uppgifter vi har om dig, för att begära rättelse, överföring eller för
          att begära att vi begränsar behandlingen, för att göra invändningar
          eller begära radering av dina uppgifter. Detta gör du enklast genom
          att kontakta oss på{' '}
          <span className="text-primary">anton.karlsson@iths.se</span>,{' '}
          <span className="text-primary">frida.wikman@iths.se</span> och{' '}
          <span className="text-primary">maja.lennevi@iths.se</span>.
        </p>

        <p>
          Om du har klagomål på vår behandling av dina personuppgifter har du
          rätt att inge klagomål till tillsynsmyndigheten
          Integritetsskydsmyndigheten, IMY.{' '}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Okej, jag förstår
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
