import { useSelector } from "react-redux";
import { Col, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useChatApi } from "../providers/SocketProvider.jsx";

const MessageForm = ({ activeChannel, currentMessages }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { chatApi } = useChatApi();
  const { currentChannelId } = useSelector(({ channelsInfo }) => channelsInfo);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, currentMessages]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }, { resetForm, setSubmitting }) => {
      const { username } = JSON.parse(localStorage.userId);
      const message = { body, username, channelId: activeChannel.id };

      chatApi.sendMessage(message)
        .then(() => {
          resetForm();
          setSubmitting(false);
        })
        .catch(() => {
          toast.error(t('toasts.networkError'));
          setSubmitting(false);
        });
    },
  });

  return (
    <>
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit} disabled={formik.isSubmitting}>
        <Form.Group className="has-validation input-group">
          <Form.Control disabled={formik.isSubmitting} name="body" aria-label={t('mainPage.messages.newMessage')} placeholder={t('mainPage.messages.enterMessage')} className="border-0 p-0 ps-2" ref={inputRef} value={formik.values.body} onChange={formik.handleChange} />
          <Button variant="group-vertical" type="submit" style={{ border: 'none' }} disabled={formik.isSubmitting || formik.values.body.trim() === ''}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('mainPage.messages.send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

const Messages = () => {
  const { t } = useTranslation();
  const activeChannel = useSelector(({ channelsInfo: { channels, currentChannelId } }) => {
    const activeChannel = channels.find((channel) => channel.id === currentChannelId);
    return activeChannel;
  });

  const messages = useSelector(({ messagesInfo }) => messagesInfo.messages);
  const currentMessages = messages.filter((message) => message.channelId === activeChannel.id);
  const messagesElements = currentMessages.map((message) => (
    <div>
      <b>{message.username}</b>
      {': '}
      {message.body}
    </div>
  ));

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {activeChannel && activeChannel.name}</b></p>
          <span className="text-muted">{`${currentMessages.length} ${t('mainPage.messages.messages')}`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages.length > 0 ? messagesElements : null}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm activeChannel={activeChannel} currentMessages={currentMessages} />
        </div>
      </div>
    </Col>
  );
};

export default Messages;