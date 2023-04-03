import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { fetchInitialData } from '../../slices/loadingSlice.js';
import { useAuth } from '../providers/AuthProvider.jsx';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const authHeader = getAuthHeader();
    dispatch(fetchInitialData(authHeader));
  }, [dispatch, getAuthHeader]);

  const { loadingStatus, loadingError } = useSelector(({ loading }) => (
    { loadingStatus: loading.status, loadingError: loading.error }
  ));

  if (loadingStatus === 'error') {
    toast.error(t(`toasts.${loadingError.message}`));
  }

  return loadingStatus === 'finished'
    ? (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    )
    : (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <div role="status" className="spinner-border text-primary">
          <span className="visually-hidden">{t('mainPage.loading')}</span>
        </div>
      </div>
    );
};

export default MainPage;
