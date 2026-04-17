import { Button } from 'react-bootstrap'
import Modal from '../ui/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../state/ui/uiSlice'
import { useRemoveChannelMutation } from '../../state/channels/channelsApi'


const ModalBody = () => {
  const dispatch = useDispatch()
  const modalInfo = useSelector((state) => state.ui.modal.extra)
  const [removeChannel] = useRemoveChannelMutation()

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleDelete = async () => {
    await removeChannel(modalInfo.channelId).unwrap()
    handleClose()
  }

  return (
    <>
      <p className='lead'>Уверены?</p>
      <div className='d-flex justify-content-end gap-2'>
        <Button variant='secondary' type='button' onClick={handleClose}>
          Отменить
        </Button>
        <Button variant='danger' type='button' onClick={() => handleDelete()}>
          Удалить
        </Button>
      </div>
    </>
  )
}

const RemoveChannelModal = () => {
  const modalInfo = useSelector((state) => state.ui.modal)
  const isOpen = modalInfo.isOpen && modalInfo.type === 'removeChannel'

  if (!isOpen) return null

  return (
    <Modal
      showModal={isOpen}
      modalTitle={'Удалить канал'}>
      <ModalBody />
    </Modal>
  )
}

export default RemoveChannelModal