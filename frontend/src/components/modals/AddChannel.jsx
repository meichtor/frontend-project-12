import { Button, Form as UiForm } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik'
import Modal from './Modal'
import * as Yup from 'yup'
import { useAddChannelMutation, useGetChannelsQuery } from '../../state/channels/channelsApi'
import { closeModal, setCurrentChannel } from '../../state/ui/uiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

const getAddChannelSchema = (channels) => Yup.object().shape({
  channelName: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(
      channels.map((ch) => ch.name),
      'Должно быть уникальным',
    ),
})

const ModalBody = () => {
  const dispatch = useDispatch()
  const [addChannel] = useAddChannelMutation()
  const { data: channels } = useGetChannelsQuery()

   const inputRef = useRef()
  
    useEffect(() => {
      inputRef.current?.select()
    }, [])
  
  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const { channelName } = values
    const channel = { name: channelName }

    try {
      const newChannel = await addChannel(channel).unwrap()
      dispatch(setCurrentChannel(newChannel.id))
      handleClose()
    }
    catch (err) {
      console.error('Ошибка отправки:', err)
      setErrors({ channelName: 'Ошибка сети. Попробуйте снова' })
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={getAddChannelSchema(channels)}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <UiForm.Control
            as={Field}
            innerRef={inputRef}
            name='channelName'
            type="text"
            placeholder=""
            autoFocus
            isInvalid={!!errors.channelName}
            className='mb-2'
          />
          <UiForm.Control.Feedback type="invalid">
            {errors.channelName}
          </UiForm.Control.Feedback>
          <div className='d-flex justify-content-end gap-2'>
            <Button variant='secondary' type='button' onClick={handleClose}>
              Отменить
            </Button>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const AddChannelModal = () => {
  const modalInfo = useSelector((state) => state.ui.modal)
  const isOpen = modalInfo.isOpen && modalInfo.type === 'addChannel'

  if (!isOpen) return null

  return (
    <Modal
      showModal={isOpen}
      modalTitle={'Добавить канал'}
    >
      <ModalBody />
    </Modal>
  )
}

export default AddChannelModal