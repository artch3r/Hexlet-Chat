import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';
import { selectCurrentChannel } from '../../../slices/channelsSlice';
import { selectCurrentMessages } from '../../../slices/messagesSlice';

const Messages = () => {
  const { t } = useTranslation();
  const messagesEndRef = useRef();

  const currentChannel = useSelector(selectCurrentChannel);
  const currentMessages = useSelector(selectCurrentMessages);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behaviour: 'smooth' });
  }, [currentMessages]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel && currentChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {t('main.messages.message', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => (
            <div key={message.id}>
              <b>{message.username}</b>
              {': '}
              {message.body}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm
            currentChannel={currentChannel}
            currentMessages={currentMessages}
          />
        </div>
      </div>
    </Col>
  );
};

export default Messages;
