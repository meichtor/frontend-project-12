import { Col, Card, Row, Container } from 'react-bootstrap'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  return (
    <Container fluid className='h-100'>
      <Row className="justify-content-center align-content-center h-100">
        <Col className='col-8' xxl={3} md={8} >
          <Card className='shadow-sm'>
            <Card.Body className='p-5'>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}