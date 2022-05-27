import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../../hooks/authSocket.jsx';
import { actions } from '../../slices/chatSlice.js';

function Remove({ onHide }) {
  const socket = useSocket();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector(
    (state) => state.modals.idForModalAction,
  );

  const generateOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await socket.removeChannel({ id: currentChannelId });
      dispatch(actions.changeChannelId(1));
      toast.success(t('toasts.remove'));
    } catch {
      toast.error(t('toasts.error.remove'));
    }
    onHide();
  };

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.sure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          variant="secondary"
          value="cancel"
          onClick={onHide}
        >
          {t('modal.cancel')}
        </Button>
        <Button
          type="button"
          variant="danger"
          value="submit"
          onClick={generateOnSubmit}
        >
          {t('modal.remove')}
        </Button>
      </Modal.Footer>
    </>
  );
}

export default Remove;
