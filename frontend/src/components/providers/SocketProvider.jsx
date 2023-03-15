import { createContext } from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../slices/messagesSlice';
import { addChannel, setChannel, deleteChannel, changeChannelName } from '../../slices/channelsSlice';

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

  socket.on('removeChannel', ({ id }) => {
    dispatch(deleteChannel(id));
    dispatch(setChannel(1));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(changeChannelName(channel));
  });

  const sendMessage = (message, checkResponse) => {
   socket.emit('newMessage', message, (response) => {
      checkResponse(response);
    });
  };

  const createChannel = (name, checkResponse) => {
    socket.emit('newChannel', { name }, (response) => {
      checkResponse(response);
    });
  };

  const removeChannel = (channelId, checkResponse) => {
    socket.emit('removeChannel', { id: channelId }, (response) => {
      checkResponse(response);
    });
  };

  const renameChannel = (channelId, name, checkResponse) => {
    socket.emit('renameChannel', { id: channelId, name }, (response) => {
      checkResponse(response);
    });
  };

  return (
    <SocketContext.Provider value={{ sendMessage, createChannel, removeChannel, renameChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;