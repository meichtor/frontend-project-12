import { Modal as BSModal } from 'react-bootstrap'

const Modal = ({ showModal, closeModal, modalTitle, children }) => {
  return (
    <BSModal show={showModal} onHide={closeModal} centered>
      <BSModal.Header closeButton>
        <BSModal.Title>{modalTitle}</BSModal.Title>
      </BSModal.Header>
      {children &&
        <BSModal.Body>
          {children}
        </BSModal.Body>
      }
    </BSModal>
  )
}

export default Modal