import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import MainPage from './MainPage/MainPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import SignUpPage from './SignUpPage/SignUpPage.jsx';
import { useAuth } from './providers/AuthProvider.jsx';
import routes from '../routes.js';

const LogOutButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.user ? (
    <Button variant="primary" onClick={auth.logOut}>
      {t('navbar.logout')}
    </Button>
  ) : null;
};

const MainRoute = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

const LoginRoute = () => {
  const auth = useAuth();

  return auth.user ? <Navigate to={routes.mainPage()} /> : <Outlet />;
};

const SignUpRoute = () => {
  const auth = useAuth();

  return auth.user ? <Navigate to={routes.mainPage()} /> : <Outlet />;
};

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <BrowserRouter>
            <Navbar expand="lg" bg="white" className="shadow-sm">
              <Container>
                <Navbar.Brand as={Link} to={routes.mainPage()}>
                  {t('navbar.hexletChat')}
                </Navbar.Brand>
                <LogOutButton />
              </Container>
            </Navbar>
            <Routes>
              <Route element={<MainRoute />}>
                <Route path={routes.mainPage()} element={<MainPage />} />
              </Route>
              <Route element={<LoginRoute />}>
                <Route path={routes.loginPage()} element={<LoginPage />} />
              </Route>
              <Route element={<SignUpRoute />}>
                <Route path={routes.signUpPage()} element={<SignUpPage />} />
              </Route>
              <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
