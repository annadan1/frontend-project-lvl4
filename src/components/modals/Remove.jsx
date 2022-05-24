import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/authSocket.jsx';

function Remove({ onHide }) {
  const socket = useSocket();

  const currentChannelId = useSelector(
    (state) => state.modals.idForModalAction,
  );

  const generateOnSubmit = async (e) => {
    e.preventDefault();
    await socket.removeChannel({ id: currentChannelId });
    onHide();
  };

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="secondary"
          value="cancel"
          onClick={onHide}
        >
          Отменить
        </Button>
        <Button
          type="button"
          variant="danger"
          value="submit"
          onClick={generateOnSubmit}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </>
  );
}

export default Remove;
