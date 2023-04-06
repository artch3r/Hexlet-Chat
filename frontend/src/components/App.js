import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './commonComponents/NavBar/NavBar.jsx';
import MainPage from './MainPage/MainPage.jsx';
import LoginPage from './LoginPage/LoginPage.jsx';
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx';
import SignUpPage from './SignUpPage/SignUpPage.jsx';
import { useAuth } from './providers/AuthProvider.jsx';
import { pageRoutes } from '../routes.js';

const PrivateRoute = () => {
  const auth = useAuth();

  return auth.user ? <Outlet /> : <Navigate to={pageRoutes.loginPage()} />;
};

const PublicRoute = () => {
  const auth = useAuth();

  return auth.user ? <Navigate to={pageRoutes.mainPage()} /> : <Outlet />;
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={pageRoutes.mainPage()} element={<MainPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={pageRoutes.loginPage()} element={<LoginPage />} />
          <Route path={pageRoutes.signUpPage()} element={<SignUpPage />} />
        </Route>
        <Route path={pageRoutes.notFoundPage()} element={<NotFoundPage />} />
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
);

export default App;
