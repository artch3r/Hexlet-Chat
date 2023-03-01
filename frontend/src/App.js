import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './components/MainPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { NotFoundPage } from './components/NotFoundPage.jsx';
import { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';


const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  return (
    <AuthContext.Provider value={{ loggedIn, logIn }}>
      {children}
    </AuthContext.Provider>
  )
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
          <Navbar expand="lg" bg="white" className="shadow-sm">
            <Container>
              <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            </Container>
          </Navbar>
          <AuthProvider>
            <BrowserRouter>
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
