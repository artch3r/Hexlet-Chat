import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Modal } from 'react-bootstrap';
import { closeModal } from "../../slices/modalSlice";
import { useSocket } from '../providers/SocketProvider';

const ChannelForm = ({ onHide }) => {
  const [error, setError] = useState(null);
  const { createChannel } = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(({ channelsInfo }) => channelsInfo.channels).map((channel) => channel.name);
  yup.setLocale({
    string: {
      min: 'От 3 до 20 символов',
      max: 'От 3 до 20 символов',
    },
    mixed: {
      required: 'Обязательное поле',
      notOneOf: 'Должно быть уникальным',
    },
  });
  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).max(20).notOneOf(channelsNames),
  });

  return (
    <Formik
    initialValues={{
      name: '',
    }}
    validationSchema={validationSchema}
    onSubmit={({ name }, { setSubmitting }) => {
      setError(null);
      createChannel({ name }, (response) => {
        if (response.status === 'ok') {
          onHide();
        } else {
          setError('Ошибка сети');
        }
      });

      setSubmitting(false);
    }}
    >
      {({ errors, handleChange, handleSubmit, isSubmitting }) => {
        if (isSubmitting && errors.name) {
          setError(errors.name);
        }
        if (isSubmitting && !errors.name) {
          setError(null);
        }

        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control name="name" id="name" className="mb-2" ref={inputRef} onChange={handleChange} isInvalid={!!error} />
              <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>
              <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <Button type="button" variant="secondary" className="me-2" onClick={onHide}>Отменить</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>Отправить</Button>
              </div>
            </Form.Group>
          </Form>
        )
      }}
    </Formik>
  );
};

const DeleteConfirmation = ({ onHide, extra }) => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const { removeChannel } = useSocket();

  return (
    <>
      <p className="lead">Уверены?</p>
      <div className="d-flex justify-content-end">
        <Button className="me-2" variant="secondary" disabled={disabled} onClick={onHide}>Отменить</Button>
        <Button className="me-2" variant="danger" disabled={disabled} onClick={() => {
          setDisabled(true);
          setError(null);

          removeChannel({ id: extra.channelId }, (response) => {
            if (response.status === 'ok') {
              setDisabled(false);
              onHide();
            } else {
              setError('Ошибка сети');
              setDisabled(false);
            }
          })
        }}>Удалить</Button>
      </div>
      {error && <div className="invalid-tooltip">{error}</div>}
    </>
  );
};

const ModalForm = () => {
  const dispatch = useDispatch();
  const { isOpened, type, extra } = useSelector(({ modal: { isOpened, type, extra } }) => ({ isOpened, type, extra }));

  const modalTitleScheme = {
    addChannel: 'Добавить канал',
    renameChannel: 'Переименовать канал',
    deleteChannel: 'Удалить канал',
    null: null,
  };

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
          {modalTitleScheme[type]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Body && <Body type={type} extra={extra} onHide={onHide} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;