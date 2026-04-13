import { useNavigate } from 'react-router';
import { Col, Card, Button, Row, Container } from 'react-bootstrap'

export default function NotFound() {
  const navigate = useNavigate()

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <Container fluid className='h-100'>
      <Row className="justify-content-center align-content-center h-100">
        <Col className='col-8' xxl={3} md={8} >
          <Card className='shadow-sm'>
            <Card.Body className='p-5'>
              <Card.Title as={'h1'} className='text-center h2 mb-5'>Страница не найдена</Card.Title>
              <Button as={'a'} className='w-100' href='/' onClick={handleBack}>Назад</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}