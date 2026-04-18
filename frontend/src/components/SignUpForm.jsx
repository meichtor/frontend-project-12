import { Button, FloatingLabel, Form as UiForm } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { routes } from '../routes'
import { useDispatch } from 'react-redux'
import { setUserData } from '../state/user/userSlice'

const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  passwordConfirmation: Yup.string()
    .required('Обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
})

const SignUpForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
          form: 'Такой пользователь уже существует'
        })
      }
      else {
        setErrors({
          form: 'Ошибка сети. Попробуйте снова'
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
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='d-flex flex-column col-12'>
          <h1 className='text-center mb-4'>Регистрация</h1>
          <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
            <UiForm.Control
              as={Field}
              name='username'
              type="text"
              placeholder="Имя пользователя"
              autoComplete='username'
              required
              isInvalid={(!!errors.username || !!errors.form) && touched.username}
              autoFocus
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.username}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="password" label="Пароль" className="mb-3">
            <UiForm.Control
              as={Field}
              name='password'
              type='password'
              placeholder="Пароль"
              autoComplete='new-password'
              required
              isInvalid={(!!errors.password || !!errors.form) && touched.password}
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.password}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="passwordConfirmation" label="Подтвердите пароль" className="mb-3">
            <UiForm.Control
              as={Field}
              name='passwordConfirmation'
              type='password'
              placeholder="Подтвердите пароль"
              autoComplete='new-password'
              required
              isInvalid={(!!errors.passwordConfirmation || !!errors.form) && touched.passwordConfirmation}
            />
            <UiForm.Control.Feedback type="invalid" tooltip>
              {errors.passwordConfirmation || errors.form}
            </UiForm.Control.Feedback>
          </FloatingLabel>
          <Button disabled={isSubmitting} type='submit' variant='outline-primary'>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm