import { Modal as BSModal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../state/ui/uiSlice'

const Modal = ({ showModal, modalTitle, children }) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeModal())

  return (
    <BSModal show={showModal} onHide={onClose} centered>
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