import { Provider } from 'react-redux';
import store from './slices/index.js';
import AuthProvider from './components/providers/AuthProvider.jsx';
import SocketProvider from './components/providers/SocketProvider.jsx';
import App from './components/App.js';

const init = (socket) => (
  <Provider store={store}>
    <AuthProvider>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </AuthProvider>
  </Provider>
)

export default init;