import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import store from './slices/index.js';
import AuthProvider from './components/providers/AuthProvider.jsx';
import ChatApiProvider from './components/providers/ChatApiProvider.jsx';
import App from './components/App.js';
import resources from './locales/index.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'ru',
    fallbackLng: ['ru', 'en'],
  });

  const socket = io();

  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <ChatApiProvider socket={socket}>
                <App />
              </ChatApiProvider>
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
