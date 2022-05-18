import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

function Channels({ props }) {
  const { channels, currentChannelId, changeChannelId } = props;
  const dispatch = useDispatch();

  return (
    <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
      {channels.map(({ id, name }) => (
        <Nav.Item as="li" className="w-100" key={id}>
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
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default Channels;
