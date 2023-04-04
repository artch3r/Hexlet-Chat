import {
  Nav, Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectCurrentChannelId, setChannel } from '../../../slices/channelsSlice';
import { openModal } from '../../../slices/modalSlice';

export const handleOpenModal = (extra, type, dispatch) => () => (
  dispatch(openModal({ type, extra }))
);

const handleSetChannel = (channel, dispatch) => () => dispatch(setChannel(channel.id));

const renderChannel = (channel, currentChannelId, dispatch, t) => {
  const buttonVariant = channel.id === currentChannelId ? 'secondary' : 'light';

  if (channel.removable === false) {
    return (
      <Button
        variant={buttonVariant}
        className="w-100 rounded-0 text-start"
        onClick={handleSetChannel(channel, dispatch)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    );
  }

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button
        className="w-100 rounded-0 text-start text-truncate"
        variant={buttonVariant}
        onClick={handleSetChannel(channel, dispatch)}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
      <Dropdown.Toggle split variant={buttonVariant}>
        <span className="visually-hidden">
          {t('mainPage.channels.channelManage')}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={handleOpenModal({ channelId: channel.id }, 'deleteChannel', dispatch)}
        >
          {t('mainPage.channels.delete')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleOpenModal({ channelId: channel.id }, 'renameChannel', dispatch)}
        >
          {t('mainPage.channels.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannelId = useSelector(selectCurrentChannelId);

  return (
    <Nav.Item as="li" className="w-100" key={channel.id}>
      {renderChannel(channel, currentChannelId, dispatch, t)}
    </Nav.Item>
  );
};

export default Channel;
