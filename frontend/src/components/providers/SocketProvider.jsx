import { createContext } from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../slices/messagesSlice';

const SocketContext = createContext();

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  const sendMessage = (message, checkResponse) => {
   socket.emit('newMessage', message, (response) => {
      checkResponse(response);
    });
  };

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;