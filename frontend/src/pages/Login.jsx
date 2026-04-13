import { Col, Card, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <Container fluid className='h-100'>
      <Row className="justify-content-center align-content-center h-100">
        <Col className='col-8' xxl={3} md={8} >
          <Card className='shadow-sm'>
            <Card.Body className='p-5'>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="text-muted p-4">
              <p className='text-center'>
                Нет аккаунта? <Link to={'/signup'}>Регистрация</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}