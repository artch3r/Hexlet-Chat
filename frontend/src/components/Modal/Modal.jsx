import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice';
import { useChatApi } from '../providers/SocketProvider';

const handleFormSubmit = (type, onHide, currentChannel, chatApi, t) => (
  ({ name }, { setSubmitting }) => {
    switch (type) {
      case 'addChannel': {
        const channel = { name };
        chatApi.createChannel(channel)
          .then(() => {
            toast.success(t('toasts.addChannel'));
            onHide();
            setSubmitting(false);
          })
          .catch(() => {
            toast.error(t('toasts.networkError'));
            setSubmitting(false);
          });
        break;
      }

      case 'renameChannel': {
        chatApi.renameChannel(currentChannel.id, name)
          .then(() => {
            toast.success(t('toasts.renameChannel'));
            onHide();
            setSubmitting(false);
          })
          .catch(() => {
            toast.error(t('toasts.networkError'));
            setSubmitting(false);
          });
        break;
      }

      default:
        break;
    }
  });

const checkErrors = (errors, isSubmitting, setError, onHide, type, values, currentChannel) => {
  if (isSubmitting && errors.name) {
    setError(errors.name);
  }
  if (isSubmitting && !errors.name) {
    setError(null);
  }
  if (type === 'renameChannel' && values.name === currentChannel.name && isSubmitting) {
    onHide();
  }
};

const ChannelForm = ({ onHide, type, extra }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const { chatApi } = useChatApi();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  });

  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const currentChannel = type === 'renameChannel'
    ? channels.find((channel) => channel.id === extra.channelId)
    : null;

  yup.setLocale({
    string: {
      min: 'incorrectChannelNameLength',
      max: 'incorrectChannelNameLength',
    },
    mixed: {
      required: 'requiredField',
      notOneOf: 'needUnique',
    },
  });
  const validationSchema = yup.object().shape({
    name: yup.string().required().trim().lowercase()
      .min(3)
      .max(20)
      .notOneOf(channelsNames),
  });

  return (
    <Formik
      initialValues={{
        name: currentChannel ? currentChannel.name : '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit(type, onHide, currentChannel, chatApi, t)}
    >
      {({
        values, errors, handleChange, handleSubmit, isSubmitting,
      }) => {
        checkErrors(errors, isSubmitting, setError, onHide, type, values, currentChannel);

        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control name="name" id="name" className="mb-2" ref={inputRef} value={values.name} onChange={handleChange} isInvalid={!!error} />
              <Form.Label htmlFor="name" className="visually-hidden">{t('modal.channelName')}</Form.Label>
              <Form.Control.Feedback type="invalid">{t(`errors.${error}`)}</Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <Button type="button" variant="secondary" className="me-2" onClick={onHide}>{t('modal.cancel')}</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>{t('modal.confirm')}</Button>
              </div>
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
};

const DeleteConfirmation = ({ onHide, extra }) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const { chatApi } = useChatApi();

  return (
    <>
      <p className="lead">{t('modal.sure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          disabled={disabled}
          onClick={onHide}
        >
          {t('modal.cancel')}
        </Button>
        <Button
          className="me-2"
          variant="danger"
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            chatApi.removeChannel(extra.channelId)
              .then(() => {
                toast.success(t('toasts.deleteChannel'));
                setDisabled(false);
                onHide();
              })
              .catch(() => {
                toast.error(t('toasts.networkError'));
                setDisabled(false);
              });
          }}
        >
          {t('modal.delete')}
        </Button>
      </div>
    </>
  );
};

const ModalForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-shadow
  const { isOpened, type, extra } = useSelector(({ modal: { isOpened, type, extra } }) => (
    { isOpened, type, extra }
  ));

  const modalBodyScheme = {
    addChannel: ChannelForm,
    renameChannel: ChannelForm,
    deleteChannel: DeleteConfirmation,
    null: null,
  };

  const Body = modalBodyScheme[type];

  const onHide = () => dispatch(closeModal());

  return (
    <Modal
      show={isOpened}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {type && t(`modal.${type}`)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Body && <Body type={type} extra={extra} onHide={onHide} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
