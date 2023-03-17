import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './slices/index.js';
import AuthProvider from './components/providers/AuthProvider.jsx';
import SocketProvider from './components/providers/SocketProvider.jsx';
import App from './components/App.js';
import resources from './locales/index.js';

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AuthProvider>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </AuthProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default init;