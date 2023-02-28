import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './components/MainPage.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { NotFoundPage } from './components/NotFoundPage.jsx';

function App() {
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white"><div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div></nav>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
    
  );
}

export default App;
