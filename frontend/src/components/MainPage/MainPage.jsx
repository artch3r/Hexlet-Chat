import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { fetchInitialData } from '../../slices/channelsSlice.js';
import { useAuth } from '../providers/AuthProvider.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const authHeader = getAuthHeader();
    dispatch(fetchInitialData(authHeader));
  }, [dispatch, getAuthHeader]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
