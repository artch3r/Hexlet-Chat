import { createContext } from 'react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../slices/messagesSlice';
import { addChannel, deleteChannel, changeChannelName } from '../../slices/channelsSlice';

const SocketContext = createContext();
const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(deleteChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(changeChannelName(channel));
  });

  const createSocketMessage = (event, data) => new Promise((resolve, reject) => {
    socket.timeout(5000).volatile.emit(event, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });

  const chatApi = {
    sendMessage: (message) => createSocketMessage('newMessage', message),
    createChannel: (channel) => createSocketMessage('newChannel', channel),
    removeChannel: (id) => createSocketMessage('removeChannel', { id }),
    renameChannel: (id, name) => createSocketMessage('renameChannel', { id, name }),
  };

  return (
    <SocketContext.Provider value={{ chatApi }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useChatApi = () => useContext(SocketContext);

export default SocketProvider;