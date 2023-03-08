import { createContext } from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../slices/messagesSlice';
import { addChannel, setChannel } from '../../slices/channelsSlice';

const SocketContext = createContext();
const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
    dispatch(setChannel(channel.id));
  });

  const sendMessage = (message, checkResponse) => {
   socket.emit('newMessage', message, (response) => {
      checkResponse(response);
    });
  };

  const createChannel = (channel, checkResponse) => {
    socket.emit('newChannel', channel, (response) => {
      checkResponse(response);
    });
  };

  return (
    <SocketContext.Provider value={{ sendMessage, createChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;