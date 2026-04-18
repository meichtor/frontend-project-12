import { Button } from 'react-bootstrap'
import Modal from '../ui/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../state/ui/uiSlice'
import { useRemoveChannelMutation } from '../../state/channels/channelsApi'
import { useTranslation } from 'react-i18next'


const ModalBody = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
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
      <p className='lead'>{t('modals.removeChannel.confirm')}</p>
      <div className='d-flex justify-content-end gap-2'>
        <Button variant='secondary' type='button' onClick={handleClose}>
          {t('modals.cancel')}
        </Button>
        <Button variant='danger' type='button' onClick={() => handleDelete()}>
          {t('modals.removeChannel.submit')}
        </Button>
      </div>
    </>
  )
}

const RemoveChannelModal = () => {
  const modalInfo = useSelector((state) => state.ui.modal)
  const isOpen = modalInfo.isOpen && modalInfo.type === 'removeChannel'
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <Modal
      showModal={isOpen}
      modalTitle={t('modals.removeChannel.title')}>
      <ModalBody />
    </Modal>
  )
}

export default RemoveChannelModal