import React from 'react';
import { Nav, Button, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IconAdd } from './icon.jsx';
import { actions } from '../slices/modalSlice.js';

function Channels({ props }) {
  const { channels, currentChannelId, changeChannelId } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const addingModal = () => {
    dispatch(actions.showModal('adding'));
  };
  const renameModal = (id) => {
    dispatch(actions.showModal('renaming'));
    dispatch(actions.changeIdForModalAction(id));
  };
  const removeModal = (id) => {
    dispatch(actions.showModal('removing'));
    dispatch(actions.changeIdForModalAction(id));
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={addingModal}
        >
          <IconAdd />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
        {channels.map(({ id, name, removable }) => (
          <Nav.Item as="li" className="w-100" key={id}>
            {removable ? (
              <Dropdown className="d-flex btn-group">
                <Button
                  variant={id === currentChannelId ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={() => {
                    dispatch(changeChannelId(id));
                  }}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle
                  id="dropdown-autoclose-true"
                  variant={id === currentChannelId ? 'secondary' : 'light'}
                  className="flex-grow-0"
                  split
                >
                  <span className="visually-hidden">{t('channels.management')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={() => removeModal(id)}>
                    {t('channels.removeChannel')}
                  </Dropdown.Item>
                  <Dropdown.Item href="#" onClick={() => renameModal(id)}>
                    {t('channels.renameChannel')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                variant={id === currentChannelId ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start"
                onClick={() => {
                  dispatch(changeChannelId(id));
                }}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
            )}
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
}

export default Channels;
