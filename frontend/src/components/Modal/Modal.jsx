import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Modal } from 'react-bootstrap';
import { closeModal } from "../../slices/modalSlice";
import { useSocket } from '../providers/SocketProvider';

const ChannelForm = () => {
  const dispatch = useDispatch();
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
      createChannel({ name }, (response) => {
        if (response.status === 'ok') {
          dispatch(closeModal());
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
                <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(closeModal())}>Отменить</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>Отправить</Button>
              </div>
            </Form.Group>
          </Form>
        )
      }}
    </Formik>
  );
};

const ModalForm = () => {
  const dispatch = useDispatch();
  const { isOpened, type, extra } = useSelector(({ modal: { isOpened, type, extra } }) => ({ isOpened, type, extra }));

  const modalTitleScheme = {
    addChannel: 'Добавить канал',
    renameChannel: 'Переименовать канал',
    deleteChannel: 'Удалить канал',
  };

  const body = type === 'deleteChannel' ? <p className="lead">Уверены?</p> : <ChannelForm type={type} extra={extra} />;

  return (
    <Modal
      show={isOpened}
      onHide={() => dispatch(closeModal())}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {modalTitleScheme[type]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;