import { Button, Form as UiForm } from 'react-bootstrap'
import { Formik, Field, Form } from 'formik'
import Modal from '../ui/Modal'
import * as Yup from 'yup'
import { useAddChannelMutation, useGetChannelsQuery } from '../../state/channels/channelsApi'
import { closeModal, setCurrentChannel } from '../../state/ui/uiSlice'
import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import initProfanity from '../../profanity'

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

const AddChannel = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [addChannel] = useAddChannelMutation()
  const { data: channels } = useGetChannelsQuery()
  const filter = initProfanity()

  const inputRef = useRef()

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const { channelName } = values
    const cleanName = filter.clean(channelName)
    const channel = { name: cleanName }

    try {
      const newChannel = await addChannel(channel).unwrap()
      dispatch(setCurrentChannel(newChannel.id))
      toast.success(t('modals.addChannel.success'), { autoClose: 2000 })
      handleClose()
    }
    catch (err) {
      console.error(`${t('errors.sending')}:`, err)
      setErrors({ channelName: t('validation.networkError') })
      toast.error(t('validation.networkError'))
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ channelName: '' }}
      validationSchema={getAddChannelSchema(channels, t)}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <Field name='channelName'>
            {({ field }) => (
              <UiForm.Control
                {...field}
                ref={inputRef}
                type="text"
                placeholder=""
                autoFocus
                isInvalid={!!errors.channelName}
                className='mb-2'
              />)}
          </Field>
          <UiForm.Control.Feedback type="invalid">
            {errors.channelName}
          </UiForm.Control.Feedback>
          <div className='d-flex justify-content-end gap-2'>
            <Button variant='secondary' type='button' onClick={handleClose}>
              {t('modals.cancel')}
            </Button>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? t('modals.addChannel.submitting') : t('modals.addChannel.submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddChannel