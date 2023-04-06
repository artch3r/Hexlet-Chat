import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../providers/AuthProvider';
import { pageRoutes } from '../../../routes';

const LogOutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.user ? (
    <Button variant="primary" onClick={auth.logOut}>
      {t('navbar.logout')}
    </Button>
  ) : null;
};

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={pageRoutes.mainPage()}>
          {t('navbar.hexletChat')}
        </Navbar.Brand>
        <LogOutButton />
      </Container>
    </Navbar>
  );
};

export default NavBar;
