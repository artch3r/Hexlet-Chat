import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useChatApi } from '../../providers/SocketProvider.jsx';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { selectCurrentChannelId } from '../../../slices/channelsSlice.js';

const MessageForm = ({ currentChannel, currentMessages }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const chatApi = useChatApi();
  const auth = useAuth();
  const currentChannelId = useSelector(selectCurrentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, currentMessages]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object().shape({
      body: yup.string().required().trim(),
    }),
    onSubmit: ({ body }, { resetForm, setSubmitting }) => {
      const { username } = auth.user;
      const message = {
        body: filter.clean(body),
        username,
        channelId: currentChannel.id,
      };

      chatApi
        .sendMessage(message)
        .then(() => {
          resetForm();
          setSubmitting(false);
        })
        .catch(() => {
          toast.error(t('toasts.networkError'));
          setSubmitting(false);
        });
    },
    validateOnMount: true,
  });

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="has-validation input-group">
        <Form.Control
          disabled={formik.isSubmitting}
          name="body"
          aria-label={t('main.messages.newMessage')}
          placeholder={t('main.messages.enterMessage')}
          className="border-0 p-0 ps-2"
          ref={inputRef}
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button
          variant="group-vertical"
          type="submit"
          style={{ border: 'none' }}
          disabled={formik.isSubmitting || formik.errors.body}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
          <span className="visually-hidden">{t('main.messages.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
