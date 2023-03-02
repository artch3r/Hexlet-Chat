import { Provider } from 'react-redux';
import store from './slices/index.js';
import AuthProvider from './components/providers/AuthProvider';
import App from './components/App.js';

const init = () => (
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
)

export default init;