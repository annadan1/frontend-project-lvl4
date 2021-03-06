import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import useSocket from '../../hooks/socketContext.jsx';

function Rename({ onHide }) {
  const socket = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);
  const { t } = useTranslation();

  const channels = useSelector((state) => state.chats.channels);
  const currentChannelId = useSelector(
    (state) => state.modals.idForModalAction,
  );
  const currentChannel = channels.find(({ id }) => id === currentChannelId);
  const channelsNames = channels.map(({ name }) => name);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('modal.errors.symbols'))
      .max(20, t('modal.errors.symbols'))
      .required(t('modal.errors.required'))
      .test(
        'is-unique',
        t('modal.errors.unique'),
        (name) => !channelsNames.includes(name),
      ),
  });

  const f = useFormik({
    initialValues: { name: currentChannel.name },
    onSubmit: async ({ name }) => {
      try {
        await socket.renameChannel({ id: currentChannelId, name });
        toast.success(t('toasts.rename'));
      } catch {
        toast.error(t('toasts.error.rename'));
      }
      onHide();
    },
    validationSchema: schema,
  });

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={f.handleChange}
              value={f.values.name}
              className="mb-2"
              name="name"
              id="name"
              isInvalid={f.errors.name}
              disabled={f.isSubmitting}
            />
            <Form.Label className="visually-hidden" htmlFor="name">
              {t('modal.channelName')}
            </Form.Label>
            {f.errors.name ? (
              <Form.Control.Feedback type="invalid">
                {f.errors.name}
              </Form.Control.Feedback>
            ) : null}
          </Form.Group>
          <div className="d-flex justify-content-end">
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
              variant="primary"
              value="submit"
              onClick={f.handleSubmit}
            >
              {t('modal.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
}

export default Rename;
