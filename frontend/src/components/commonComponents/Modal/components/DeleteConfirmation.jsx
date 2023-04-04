import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useChatApi } from '../../../providers/SocketProvider';

const handleRemoveChannel = (extra, chatApi, setDisabled, onHide, t) => () => {
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
};

const DeleteConfirmation = ({ onHide, extra }) => {
  const { t } = useTranslation();
  const [disabled, setDisabled] = useState(false);
  const chatApi = useChatApi();

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
          onClick={handleRemoveChannel(extra, chatApi, setDisabled, onHide, t)}
        >
          {t('modal.delete')}
        </Button>
      </div>
    </>
  );
};

export default DeleteConfirmation;
