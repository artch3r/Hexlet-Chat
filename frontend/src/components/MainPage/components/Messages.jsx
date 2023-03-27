import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';

const Messages = () => {
  const { t } = useTranslation();
  const activeChannel = useSelector(
    // eslint-disable-next-line max-len
    ({ channelsInfo: { channels, currentChannelId } }) => channels.find((channel) => channel.id === currentChannelId),
  );

  const messages = useSelector(({ messagesInfo }) => messagesInfo.messages);
  const currentMessages = messages.filter(
    (message) => message.channelId === activeChannel.id,
  );
  const messagesElements = currentMessages.map((message) => (
    <div key={message.id}>
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  ));

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel && activeChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {`${currentMessages.length} ${t('mainPage.messages.messages')}`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.length > 0 ? messagesElements : null}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm
            activeChannel={activeChannel}
            currentMessages={currentMessages}
          />
        </div>
      </div>
    </Col>
  );
};

export default Messages;
