import {
  createContext, useContext, useMemo, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../slices/messagesSlice';
import {
  addChannel,
  setChannel,
  deleteChannel,
  changeChannelName,
} from '../../slices/channelsSlice';
import store from '../../slices/index.js';

const handleNewChannelResponse = ({ status, data }) => {
  if (status === 'ok') {
    store.dispatch(setChannel(data.id));
  }
};

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

  socket.on('renameChannel', ({ id, name }) => {
    dispatch(changeChannelName({ id, changes: { name } }));
  });

  const createSocketMessage = useCallback((event, data, handleResponse) => new Promise((resolve, reject) => {
    socket.timeout(5000).volatile.emit(event, data, (err, response) => {
      if (err) {
        reject(err);
      }

      if (handleResponse) {
        handleResponse(response);
      }

      resolve();
    });
  }), [socket]);

  const chatApi = useMemo(() => ({
    sendMessage: (message) => createSocketMessage('newMessage', message),
    createChannel: (channel) => createSocketMessage('newChannel', channel, handleNewChannelResponse),
    removeChannel: (id) => createSocketMessage('removeChannel', { id }),
    renameChannel: (id, name) => createSocketMessage('renameChannel', { id, name }),
  }), [createSocketMessage]);

  return (
    <SocketContext.Provider value={chatApi}>
      {children}
    </SocketContext.Provider>
  );
};

export const useChatApi = () => useContext(SocketContext);

export default SocketProvider;
