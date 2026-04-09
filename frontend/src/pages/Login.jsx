import { Col, Card, Button, Form, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
})

export default function Login() {
  return (
    <Col className='col-8' xxl={3} md={8} >
      <Card className='shadow-sm'>
        <Card.Body className='p-5'>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('Submitted:', values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form className='d-flex flex-column col-12'>
                <h1 className='text-center mb-4'>Войти</h1>
                <FloatingLabel controlId="username" label="Ваш Ник" className="mb-3">
                  <Form.Control
                    as={Field}
                    name='username'
                    type="text"
                    placeholder="Ваш Ник"
                    autoComplete='username'
                    required
                    isInvalid={!!errors.username && touched.username}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Ваш Пароль" className="mb-3">
                  <Form.Control
                    as={Field}
                    name='password'
                    type='password'
                    placeholder="Ваш Пароль"
                    autoComplete='current-password'
                    required
                    isInvalid={!!errors.password && touched.password}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button type='submit' variant='outline-primary'>Войти</Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
        <Card.Footer className="text-muted p-4">
          <p className='text-center'>
            Нет аккаунта? <Link to={'/signup'}>Регистрация</Link>
          </p>
        </Card.Footer>
      </Card>
    </Col>
  )
}