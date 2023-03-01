import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from '../../slices/channelsSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
}
