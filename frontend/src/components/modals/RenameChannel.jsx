import { Button, Form as UiForm } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik'
import Modal from '../ui/Modal'
import * as Yup from 'yup'
import { useGetChannelsQuery, useRenameChannelMutation } from '../../state/channels/channelsApi'
import { closeModal } from '../../state/ui/uiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const getAddChannelSchema = (channels, t) => Yup.object().shape({
  channelName: Yup.string()
    .trim()
    .required(t('validation.required'))
    .min(3, t('validation.channels.channelNameLength'))
    .max(20, t('validation.channels.channelNameLength'))
    .notOneOf(
      channels.map((ch) => ch.name),
      t('validation.channels.channelNameUnique'),
    ),
})

const ModalBody = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [renameChannel] = useRenameChannelMutation()
  const { data: channels } = useGetChannelsQuery()
  const modalInfo = useSelector((state) => state.ui.modal.extra)
  const selectedChannelId = modalInfo.channelId
  const currentChannel = channels.find((ch) => ch.id === selectedChannelId)

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  const handleClose = () => {
    toast.success(t('modals.renameChannel.success'), {
      position: 'top-right',
      autoClose: 2000,
    })
    dispatch(closeModal())
  }

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const { channelName } = values
    const payload = {
      channel: { name: channelName },
      id: selectedChannelId
    }

    try {
      await renameChannel(payload).unwrap()
      handleClose()
    }
    catch (err) {
      console.error(`${t('errors.sending')}:`, err)
      setErrors({ channelName: t('validation.networkError') })
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ channelName: currentChannel.name }}
      validationSchema={getAddChannelSchema(channels, t)}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <UiForm.Group className='mb-2'>
            <UiForm.Control
              as={Field}
              innerRef={inputRef}
              name='channelName'
              type="text"
              placeholder=""
              isInvalid={!!errors.channelName}
              className='mb-2'
              onFocus={(e) => e.target.select()}
              autoFocus={true}
            />
            <UiForm.Control.Feedback type="invalid">
              {errors.channelName}
            </UiForm.Control.Feedback>
          </UiForm.Group>
          <div className='d-flex justify-content-end gap-2'>
            <Button variant='secondary' type='button' onClick={handleClose}>
              {t('modals.cancel')}
            </Button>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? t('modals.renameChannel.submitting') : t('modals.renameChannel.submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const RenameChannelModal = () => {
  const { t } = useTranslation()
  const modalInfo = useSelector((state) => state.ui.modal)
  const isOpen = modalInfo.isOpen && modalInfo.type === 'renameChannel'

  if (!isOpen) return null

  return (
    <Modal
      showModal={isOpen}
      modalTitle={t('modals.renameChannel.title')}
    >
      <ModalBody />
    </Modal>
  )
}

export default RenameChannelModal