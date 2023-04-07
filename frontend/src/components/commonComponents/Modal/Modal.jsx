import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { closeModal, selectModalInfo, MODAL_TYPES } from '../../../slices/modalSlice';
import DeleteConfirmation from './components/DeleteConfirmation';
import ChannelForm from './components/ChannelForm.jsx';

const onHide = (dispatch) => () => dispatch(closeModal());

const ModalForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isOpened, type, extra } = useSelector(selectModalInfo);

  const modalBodyScheme = {
    [MODAL_TYPES.addChannel]: ChannelForm,
    [MODAL_TYPES.renameChannel]: ChannelForm,
    [MODAL_TYPES.deleteChannel]: DeleteConfirmation,
  };

  const ModalBodyInner = modalBodyScheme[type];

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
        {type && <ModalBodyInner type={type} extra={extra} onHide={onHide(dispatch)} />}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
