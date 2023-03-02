import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { MainPage } from './components/MainPage/MainPage.jsx';
import { LoginPage } from './components/LoginPage/LoginPage.jsx';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage.jsx';
import { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import AuthContext, { useAuth } from './contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.userId ? true : false);

  const logIn = () => setLoggedIn(true);
  
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
};

const LogOutButton = () => {
  const auth = useAuth();

  return auth.loggedIn ? <Button variant="primary" onClick={auth.logOut}>Выйти</Button> : null;
};

const MainRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

function App() {
  useEffect(() => {
    const html = document.getElementsByTagName( 'html' )[0];
    const root = document.getElementById('root');
    root.classList.add('h-100');
    html.classList.add('h-100');
    document.body.classList.add('h-100');
  }, []);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <AuthProvider>
            <BrowserRouter>
              <Navbar expand="lg" bg="white" className="shadow-sm">
                <Container>
                  <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                  <LogOutButton />
                </Container>
              </Navbar>
              <Routes>
                <Route 
                  path='/' 
                  element={(
                    <MainRoute>
                      <MainPage />
                    </MainRoute>
                  )} 
                />
                <Route path='login' element={<LoginPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
