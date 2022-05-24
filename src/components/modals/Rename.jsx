import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import useSocket from '../../hooks/authSocket.jsx';

function Rename({ onHide }) {
  const socket = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const channels = useSelector((state) => state.chats.channels);
  const currentChannelId = useSelector(
    (state) => state.modals.idForModalAction,
  );
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelsNames = channels.map(({ name }) => name);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .test(
        'is-uniq',
        'Должно быть уникальным',
        (name) => !channelsNames.includes(name),
      ),
  });

  const f = useFormik({
    initialValues: { name: currentChannel.name },
    onSubmit: async ({ name }) => {
      await socket.renameChannel({ id: currentChannelId, name });
      onHide();
    },
    validationSchema: schema,
  });

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              className="mb-2"
              name="name"
              isInvalid={f.errors.name && f.touched.name}
              disabled={f.isSubmitting}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {f.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
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
          variant="primary"
          value="submit"
          onClick={f.handleSubmit}
        >
          Отправить
        </Button>
      </Modal.Footer>
    </>
  );
}

export default Rename;
