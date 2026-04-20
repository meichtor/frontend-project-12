import { Button } from 'react-bootstrap'
import Modal from '../ui/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../state/ui/uiSlice'
import { useRemoveChannelMutation } from '../../state/channels/channelsApi'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const RemoveChannel = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const modalInfo = useSelector((state) => state.ui.modal.extra)
  const [removeChannel] = useRemoveChannelMutation()

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleDelete = async () => {
    try {
      await removeChannel(modalInfo.channelId).unwrap()
      toast.success(t('modals.removeChannel.success'))
      handleClose()
    }
    catch (e) {
      console.error(`${t('errors.sending')}:`, e)
      toast.error(t('validation.networkError'))
    }
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

export default RemoveChannel