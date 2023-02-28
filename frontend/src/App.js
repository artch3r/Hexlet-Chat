import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './components/MainPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { NotFoundPage } from './components/NotFoundPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
