import { Outlet, NavLink as RouterNavLink } from 'react-router';
import { Navbar, Row, Container } from 'react-bootstrap'

export default function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100 h-100">
      <Navbar className='shadow-sm' bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={RouterNavLink} to="/">
            Slack Chat
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container as="main" fluid className='h-100'>
        <Row className="justify-content-center align-content-center h-100">
          <Outlet />
        </Row>
      </Container>
    </div>
  );
}