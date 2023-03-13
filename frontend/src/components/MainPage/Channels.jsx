import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { setChannel } from '../../slices/channelsSlice';
import { useSocket } from '../providers/SocketProvider';

const renderChannels = (channels, currentChannelId) => channels.map((channel) => {
  const dispatch = useDispatch();
  let channelElement;

  switch (channel.removable) {
    case false: {
      const buttonVariant = channel.id === currentChannelId ? 'secondary' : 'light';
      channelElement = (
        <Button variant={buttonVariant} className="w-100 rounded-0 text-start" onClick={() => dispatch(setChannel(channel.id))}>
          <span class="me-1">#</span>
          {channel.name}
        </Button>
      );
      break;
    };
    case true: {
      const buttonVariant = channel.id === currentChannelId ? 'secondary' : 'light';
      channelElement = (
        <Dropdown as={ButtonGroup} className="w-100">
          <Button className="w-100 rounded-0 text-start text-truncate" variant={buttonVariant} onClick={() => dispatch(setChannel(channel.id))}>
            <span class="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split variant={buttonVariant} />
          <Dropdown.Menu>
            <Dropdown.Item>Удалить</Dropdown.Item>
            <Dropdown.Item>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      break;
    }
    default:
      break;
  }

  return (
    <li className="nav-item w-100">
      {channelElement}
    </li>
  );
});

const NewChannelForm = ({ onHide }) => {
  const [error, setError] = useState(null);
  const { createChannel } = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const channelsNames = useSelector(({ channels }) => channels.channels).map((channel) => channel.name);
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
    onSubmit={({ name }, { setSubmitting, resetForm }) => {
      createChannel({ name }, (response) => {
        if (response.status === 'ok') {
          resetForm();
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

const ChannelModal = (props) => {
  return (
    <Modal
      {...props}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewChannelForm onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

const Channels = () => {
  const [modalShow, setModalShow] = useState(false);
  const { channels, currentChannelId } = useSelector(({ channels }) => ({ channels: channels.channels, currentChannelId: channels.currentChannelId }));
  const channelsElements = renderChannels(channels, currentChannelId);

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => setModalShow(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channelsElements}
        </ul>
      </div>
      <ChannelModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Channels;