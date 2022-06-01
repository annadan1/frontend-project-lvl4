import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import useSocket from '../../hooks/socketContext.jsx';

function Add({ onHide }) {
  const socket = useSocket();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const { t } = useTranslation();

  const channels = useSelector((state) => state.chats.channels);
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
    initialValues: { name: '' },
    onSubmit: async ({ name }) => {
      try {
        await socket.addChannel({ name });
        toast.success(t('toasts.add'));
      } catch {
        toast.error(t('toasts.error.add'));
      }
      onHide();
    },
    validationSchema: schema,
  });

  return (
    <>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
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
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
}

export default Add;
