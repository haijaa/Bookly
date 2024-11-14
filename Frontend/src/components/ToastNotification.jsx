import PropTypes from "prop-types";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

ToastNotification.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default function ToastNotification({ title, message, show }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="bg-dark position-relative"
    >
      <ToastContainer
        position="top-center"
        className="p-3"
        style={{ zIndex: 1, position: "fixed" }}
      >
        <Toast bg="light" show={show} autohide>
          <Toast.Header>
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
