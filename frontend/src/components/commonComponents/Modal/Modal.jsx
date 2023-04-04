import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { closeModal, selectModalInfo } from '../../../slices/modalSlice';
import DeleteConfirmation from './components/DeleteConfirmation';
import ChannelForm from './components/ChannelForm.jsx';

const onHide = (dispatch) => () => dispatch(closeModal());

const ModalForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isOpened, type, extra } = useSelector(selectModalInfo);

  const modalBodyScheme = {
    addChannel: ChannelForm,
    renameChannel: ChannelForm,
    deleteChannel: DeleteConfirmation,
    null: null,
  };

  const Body = modalBodyScheme[type];

  return (
    <Modal
      show={isOpened}
      onHide={onHide(dispatch)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {type && t(`modal.${type}`)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Body && <Body type={type} extra={extra} onHide={onHide(dispatch)} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
