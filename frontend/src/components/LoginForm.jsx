import { Button, FloatingLabel, Form as UiForm } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { routes } from '../routes'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
})

const ErrorTooltip = ({ name, errors }) => {
  const error = errors[name]
  return (
    <UiForm.Control.Feedback type="invalid" tooltip>
      {error}
    </UiForm.Control.Feedback>
  )
}

const LoginForm = () => {
  const navigate = useNavigate()

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const response = await axios.post(routes.loginPath(), values)
      const { token } = response.data
      localStorage.setItem('auth_token', token)
      navigate('/')
    }
    catch (error) {
      const status = error.response?.status

      if (status === 401) {
        setErrors({
          form: 'Неверное имя пользователя или пароль'
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
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='d-flex flex-column col-12'>
          <h1 className='text-center mb-4'>Войти</h1>
          <FloatingLabel controlId="username" label="Ваш Ник" className="mb-3">
            <UiForm.Control
              as={Field}
              name='username'
              type="text"
              placeholder="Ваш Ник"
              autoComplete='username'
              required
              isInvalid={(!!errors.username || !!errors.form) && touched.username}
            />
            {errors.username &&
              <ErrorTooltip name='username' errors={errors} />
            }
          </FloatingLabel>
          <FloatingLabel controlId="password" label="Ваш Пароль" className="mb-3">
            <UiForm.Control
              as={Field}
              name='password'
              type='password'
              placeholder="Ваш Пароль"
              autoComplete='current-password'
              required
              isInvalid={(!!errors.password || !!errors.form) && touched.password}
            />
            {errors.password &&
              <ErrorTooltip name='password' errors={errors} />
            }
            {errors.form &&
              <ErrorTooltip name='form' errors={errors} />
            }
          </FloatingLabel>
          <Button disabled={isSubmitting} type='submit' variant='outline-primary'>
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm