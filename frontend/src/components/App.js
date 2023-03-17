import { BrowserRouter, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import { MainPage } from './MainPage/MainPage.jsx';
import { LoginPage } from './LoginPage/LoginPage.jsx';
import { NotFoundPage } from './NotFoundPage/NotFoundPage.jsx';
import SignUpPage from './SignUpPage/SignUpPage.jsx';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from './providers/AuthProvider.jsx';

const LogOutButton = () => {
  const auth = useAuth();

  return auth.loggedIn ? <Button variant="primary" onClick={auth.logOut}>Выйти</Button> : null;
};

const MainRoute = () => {
  const auth = useAuth();

  return (
    auth.loggedIn ? <Outlet /> : <Navigate to="/login" />
  );
};

const LoginRoute = () => {
  const auth = useAuth();

  return (
    auth.loggedIn ? <Navigate to='/' /> : <Outlet />
  );
};

const SignUpRoute = () => {
  const auth = useAuth();

  return (
    auth.loggedIn ? <Navigate to="/" /> : <Outlet />
  );
};

const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <BrowserRouter>
          <Navbar expand="lg" bg="white" className="shadow-sm">
            <Container>
              <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
              <LogOutButton />
            </Container>
          </Navbar>
          <Routes>
            <Route element={<MainRoute />}>
              <Route path='/' element={<MainPage />} />
            </Route>
            <Route element={<LoginRoute />}>
              <Route path='login' element={<LoginPage />} />
            </Route>
            <Route element={<SignUpRoute />}>
              <Route path='signup' element={<SignUpPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </div>
);


export default App;
