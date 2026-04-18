import { Button, FloatingLabel, Form as UiForm } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { routes } from '../routes'
import { useDispatch } from 'react-redux'
import { setUserData } from '../state/user/userSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const getLoginSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .required(t('validation.required')),
  password: Yup.string()
    .required(t('validation.required')),
})

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const schema = getLoginSchema(t)

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post(routes.loginPath(), values)
      const { token, username } = response.data
      dispatch(setUserData({ token, username }))
      navigate('/')
    }
    catch (error) {
      const status = error.response?.status

      if (status === 401) {
        setErrors({
          form: t('validation.login.invalidUserCredentials')
        })
        toast.error(t('validation.login.invalidUserCredentials'), {
          position: 'top-right'
        })
      }
      else {
        setErrors({
          form: t('validation.networkError')
        })
        toast.error(t('validation.networkError'), {
          position: 'top-right'
        })
      }
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='d-flex flex-column col-12'>
          <h1 className='text-center mb-4'>{t('login.title')}</h1>
          <FloatingLabel controlId="username" label={t('login.username')} className="mb-3">
            <UiForm.Control
              as={Field}
              name='username'
              type="text"
              placeholder={t('login.username')}
              autoComplete='username'
              required
              isInvalid={(!!errors.username || !!errors.form) && touched.username}
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.username}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="password" label={t('login.password')} className="mb-3">
            <UiForm.Control
              as={Field}
              name='password'
              type='password'
              placeholder={t('login.password')}
              autoComplete='current-password'
              required
              isInvalid={(!!errors.password || !!errors.form) && touched.password}
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.password || errors.form}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <Button disabled={isSubmitting} type='submit' variant='outline-primary'>
            {isSubmitting ? t('login.submitting') : t('login.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm