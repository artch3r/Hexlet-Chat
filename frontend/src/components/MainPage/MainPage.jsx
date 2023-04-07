import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fetchInitialData, selectLoadingInfo, MAIN_DATA_LOADING_STATUS } from '../../slices/loadingSlice.js';
import { useAuth } from '../providers/AuthProvider.jsx';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';

const ERROR_CODES = {
  network: 'ERR_NETWORK',
  unauthorized: 'ERR_BAD_REQUEST',
};

const handleUpdate = (navigate) => () => {
  navigate(0);
};

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div role="status" className="spinner-border text-primary">
        <span className="visually-hidden">{t('main.loading')}</span>
      </div>
    </div>
  );
};

const Error = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <p className="p-2 fst-italic">{t('errors.somethingWrong')}</p>
      <Button className="p-2" onClick={handleUpdate(navigate)}>{t('errors.update')}</Button>
    </div>
  );
};

const ChatContent = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
    </Row>
  </Container>
);

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { getAuthHeader, logOut } = useAuth();

  useEffect(() => {
    const authHeader = getAuthHeader();
    dispatch(fetchInitialData(authHeader));
  }, [dispatch, getAuthHeader]);

  const { status, error } = useSelector(selectLoadingInfo);

  if (status === [MAIN_DATA_LOADING_STATUS.error]) {
    switch (error.code) {
      case ERROR_CODES.network:
        toast.error(t('toasts.networkError'));
        break;
      case ERROR_CODES.unauthorized:
        toast.error(t('toasts.unauthorized'));
        logOut();
        break;
      default:
        break;
    }
  }

  const mainContentScheme = {
    [MAIN_DATA_LOADING_STATUS.loading]: Loading,
    [MAIN_DATA_LOADING_STATUS.error]: Error,
    [MAIN_DATA_LOADING_STATUS.finished]: ChatContent,
  };

  const MainContent = mainContentScheme[status];

  return MainContent ? <MainContent /> : null;
};

export default MainPage;
