import { Outlet, NavLink as RouterNavLink } from 'react-router';
import { Navbar, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../state/user/userSlice';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const isAuth = useSelector(state => !!state.user.token)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (
    <div className="d-flex flex-column min-vh-100 h-100">
      <Navbar className='shadow-sm' bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={RouterNavLink} to="/">
            {t('header.title')}
          </Navbar.Brand>
          {isAuth &&
            <Button
              variant='primary'
              onClick={() => dispatch(logout())}
            >
              {t('header.logout')}
            </Button>
          }
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}