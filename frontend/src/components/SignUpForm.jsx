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

const getSignUpSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .required(t('validation.required'))
    .min(3, t('validation.signup.usernameLength'))
    .max(20, t('validation.signup.usernameLength')),
  password: Yup.string()
    .required(t('validation.required'))
    .min(6, t('validation.signup.passwordLength')),
  passwordConfirmation: Yup.string()
    .required(t('validation.required'))
    .oneOf([Yup.ref('password'), null], t('validation.signup.passwordsMustMatch')),
})

const SignUpForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const schema = getSignUpSchema(t)

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const newUser = {
        username: values.username,
        password: values.password,
      }
      const response = await axios.post(routes.signUpPath(), newUser)
      const { token, username } = response.data
      dispatch(setUserData({ token, username }))
      navigate('/')
    }
    catch (error) {
      const status = error.response?.status

      if (status === 409) {
        setErrors({
          form: t('validation.signup.userExists')
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
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='d-flex flex-column col-12'>
          <h1 className='text-center mb-4'>{t('signup.title')}</h1>
          <FloatingLabel controlId="username" label={t('signup.username')} className="mb-3">
            <UiForm.Control
              as={Field}
              name='username'
              type="text"
              placeholder={t('signup.username')}
              autoComplete='username'
              required
              isInvalid={(!!errors.username || !!errors.form) && touched.username}
              autoFocus
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.username}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="password" label={t('signup.password')} className="mb-3">
            <UiForm.Control
              as={Field}
              name='password'
              type='password'
              placeholder={t('signup.password')}
              autoComplete='new-password'
              required
              isInvalid={(!!errors.password || !!errors.form) && touched.password}
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.password}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="passwordConfirmation" label={t('signup.confirmPassword')} className="mb-3">
            <UiForm.Control
              as={Field}
              name='passwordConfirmation'
              type='password'
              placeholder={t('signup.confirmPassword')}
              autoComplete='new-password'
              required
              isInvalid={(!!errors.passwordConfirmation || !!errors.form) && touched.passwordConfirmation}
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.passwordConfirmation || errors.form}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <Button disabled={isSubmitting} type='submit' variant='outline-primary'>
            {isSubmitting ? t('signup.submitting') : t('signup.submit')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm