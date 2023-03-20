import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
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
  
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const rollbarConfig = {
    accessToken: '39da1795bb614b51b7bcdb6ba2e247ee',
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <SocketProvider socket={socket}>
                <App />
              </SocketProvider>
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;