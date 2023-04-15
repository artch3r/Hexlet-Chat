import { Form, Button } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useChatApi } from '../../../providers/ChatApiProvider';
import { selectChannelNames } from '../../../../slices/channelsSlice';
import { MODAL_TYPES } from '../../../../slices/modalSlice';

const handleFormSubmit = (type, onHide, extra, chatApi, t) => (
  ({ name }, { setSubmitting }) => {
    switch (type) {
      case MODAL_TYPES.addChannel: {
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

      case MODAL_TYPES.renameChannel: {
        if (extra.channelName === name) {
          onHide();
          break;
        }
        chatApi.renameChannel(extra.channelId, name)
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

const ChannelForm = ({ onHide, type, extra }) => {
  const { t } = useTranslation();
  const chatApi = useChatApi();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, [type]);

  const channelNames = useSelector(selectChannelNames);
  const channelNameInModal = type === MODAL_TYPES.renameChannel
    ? extra.channelName
    : null;
  const filteredChannelNames = channelNames
    .filter((channelName) => channelName !== channelNameInModal);

  const validationSchema = yup.object().shape({
    name: yup.string().required('requiredField').trim().lowercase()
      .min(3, 'incorrectChannelNameLength')
      .max(20, 'incorrectChannelNameLength')
      .notOneOf(filteredChannelNames, 'needUnique'),
  });

  return (
    <Formik
      initialValues={{
        name: channelNameInModal ?? '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit(type, onHide, extra, chatApi, t)}
    >
      {({
        values, errors, handleChange, handleSubmit, isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="position-relative">
            <Form.Control name="name" id="name" className="mb-2" ref={inputRef} value={values.name} onChange={handleChange} disabled={isSubmitting} isInvalid={errors.name} />
            <Form.Label htmlFor="name" className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>{t(`errors.${errors.name}`)}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="button" variant="secondary" className="me-2" disabled={isSubmitting} onClick={onHide}>{t('modal.cancel')}</Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>{t('modal.confirm')}</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChannelForm;
