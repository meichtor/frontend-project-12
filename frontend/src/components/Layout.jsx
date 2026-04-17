import { Outlet, NavLink as RouterNavLink } from 'react-router';
import { Navbar, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../state/user/userSlice';

export default function Layout() {
  const isAuth = useSelector(state => !!state.user.token)
  const dispatch = useDispatch()

  return (
    <div className="d-flex flex-column min-vh-100 h-100">
      <Navbar className='shadow-sm' bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={RouterNavLink} to="/">
            Slack Chat
          </Navbar.Brand>
          {isAuth &&
            <Button variant='primary' onClick={() => dispatch(logout())}>Выйти</Button>
          }
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}