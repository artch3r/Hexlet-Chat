import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../slices/modalSlice';
import DeleteConfirmation from './components/DeleteConfirmation';
import ChannelForm from './components/ChannelForm.jsx';

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
