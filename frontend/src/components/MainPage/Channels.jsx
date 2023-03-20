import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown, Nav } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { setChannel } from '../../slices/channelsSlice';
import ModalForm from '../Modal/Modal.jsx';
import { openModal } from '../../slices/modalSlice';

const renderChannels = (channels, currentChannelId, t) => channels.map((channel) => {
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
          <Dropdown.Toggle split variant={buttonVariant}>
            <span class="visually-hidden">{t('mainPage.channels.channelManage')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch(openModal({ type: 'deleteChannel', extra: { channelId: channel.id } }))}>{t('mainPage.channels.delete')}</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renameChannel', extra: { channelId: channel.id } }))}>{t('mainPage.channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
      break;
    }
    default:
      break;
  }

  return (
    <Nav.Item as="li" className="w-100">
      {channelElement}
    </Nav.Item>
  );
});

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector(({ channelsInfo: { channels, currentChannelId } }) => ({ channels, currentChannelId }));
  const channelsElements = renderChannels(channels, currentChannelId, t);

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('mainPage.channels.channels')}</b>
          <Button variant="light" className="p-0 text-primary btn-group-vertical" onClick={() => dispatch(openModal({ type: 'addChannel', extra: null }))}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <span className="visually-hidden">+</span>
          </Button>
        </div>
        <Nav as="ul" fill variant="pills" id="channels-box" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
          {channelsElements}
        </Nav>
      </div>
      <ModalForm />
    </>
  );
};

export default Channels;