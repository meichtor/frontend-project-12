import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../state/ui/uiSlice.js'
import modals from './index.js'
import Modal from '../ui/Modal.jsx'
import { useTranslation } from 'react-i18next'

const ChatModal = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, type } = useSelector((state) => state.ui.modal)

  const handleClose = () => dispatch(closeModal())

  const currentModalTitle = modals[type]?.title
  const CurrentModalBody = modals[type]?.body
  if (!type) return null

  return (
    <Modal modalTitle={t(currentModalTitle)} showModal={isOpen} closeModal={handleClose} centered>
      <CurrentModalBody />
    </Modal>
  )
}

export default ChatModal