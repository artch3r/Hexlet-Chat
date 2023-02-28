import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from '../slices/channelsSlice.js';

export const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);

  return (
    <>
      <h3>Main Page</h3>
      <div>
        This is main page
      </div>
    </>
  );
}
