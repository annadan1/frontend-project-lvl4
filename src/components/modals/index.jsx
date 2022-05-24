import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';
import { actions } from '../../slices/modalSlice.js';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

function ShowModal() {
  const currentModal = useSelector((state) => state.modals.type);
  const isOpened = useSelector((state) => state.modals.open);
  const dispatch = useDispatch();

  const onHide = () => {
    dispatch(actions.hideModal());
  };

  if (currentModal === null) {
    return null;
  }

  const SelectedModal = modals[currentModal];
  return (
    <Modal show={isOpened} onHide={onHide} centered>
      <SelectedModal onHide={onHide} />
    </Modal>
  );
}

export default ShowModal;
