import {
  Navbar, Container, Button, Dropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../providers/AuthProvider';
import { pageRoutes } from '../../../routes';

const handleChangeLanguage = (i18n, language) => () => {
  i18n.changeLanguage(language);
  localStorage.setItem('language', language);
};

const LogOutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.user ? (
    <Button variant="primary" onClick={auth.logOut}>
      {t('navbar.logout')}
    </Button>
  ) : null;
};

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <Dropdown className="align-content-center justify-content-center">
      <Dropdown.Toggle variant="light">
        {t('language.dropdownToggle')}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {i18n.languages.map((language) => (
          <Dropdown.Item
            onClick={handleChangeLanguage(i18n, language)}
            key={language}
          >
            {language}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to={pageRoutes.mainPage()}>
          {t('navbar.hexletChat')}
        </Navbar.Brand>
        <LanguageSelector />
        <LogOutButton />
      </Container>
    </Navbar>
  );
};

export default NavBar;
