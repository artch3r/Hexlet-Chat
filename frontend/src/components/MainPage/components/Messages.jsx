import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';
import { selectCurrentChannel } from '../../../slices/channelsSlice';

const Messages = () => {
  const { t } = useTranslation();
  const messagesEndRef = useRef();

  const currentChannel = useSelector(selectCurrentChannel);

  const messages = useSelector(({ messagesInfo }) => messagesInfo.messages);
  const currentMessages = messages.filter(
    (message) => message.channelId === currentChannel.id,
  );
  const messagesElements = currentMessages.map((message) => (
    <div key={message.id}>
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  ));

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
            {t('mainPage.messages.message', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.length > 0 ? messagesElements : null}
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
