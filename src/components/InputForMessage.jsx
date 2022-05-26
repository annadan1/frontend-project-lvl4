import { Form, InputGroup } from 'react-bootstrap';
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { IconSend } from './icon.jsx';
import useSocket from '../hooks/authSocket.jsx';

function Input({ currentChannelId }) {
  const author = JSON.parse(localStorage.getItem('userId')).username;
  const socket = useSocket();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: async ({ text }, { resetForm }) => {
      await socket.addMessage({ author, text, currentChannelId });
      resetForm({ values: '' });
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup
        className={formik.values.text === '' ? 'has-validation' : null}
      >
        <Form.Control
          type="text"
          name="text"
          id="text"
          aria-label={t('message.newMessage')}
          placeholder={t('message.placeholder')}
          className="border-0 p-0 ps-2"
          value={formik.values.text}
          onChange={formik.handleChange}
          ref={inputRef}
        />
        <button
          type="submit"
          className="btn btn-group-vertical"
          disabled={formik.values.text === ''}
        >
          <span className="visually-hidden">{t('message.send')}</span>
          <IconSend />
        </button>
      </InputGroup>
    </Form>
  );
}

export default Input;
