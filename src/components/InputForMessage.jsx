import { Form, InputGroup } from 'react-bootstrap';
import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { IconSend, IconEmoji } from './icon.jsx';
import useSocket from '../hooks/socketContext.jsx';
import EmojiPicker from './emojiPicker/EmojiPicker.jsx';

function Input({ currentChannelId }) {
  const author = JSON.parse(localStorage.getItem('userId')).username;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const socket = useSocket();
  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await socket.addMessage({ author, text: inputValue, currentChannelId });
      setInputValue('');
    } catch {
      toast.error(t('toasts.error.send'));
    }
  };

  const inputRef = useRef();

  useEffect(() => {
    if (showEmojiPicker === false) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      {showEmojiPicker ? (
        <EmojiPicker
          locale={i18n.language}
          showEmojiPicker={showEmojiPicker}
          setShowEmojiPicker={setShowEmojiPicker}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      ) : null}
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={handleSubmit}
      >
        <InputGroup className={inputValue === '' ? 'has-validation' : null}>
          <Form.Control
            type="text"
            name="text"
            id="text"
            aria-label={t('message.newMessage')}
            placeholder={t('message.placeholder')}
            className="border-0 p-0 ps-2"
            value={inputValue}
            onChange={handleChange}
            ref={inputRef}
          />
          <button
            type="button"
            className="btn btn-group-vertical"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <IconEmoji />
          </button>
          <button
            type="submit"
            className="btn btn-group-vertical"
            disabled={inputValue === ''}
          >
            <span className="visually-hidden">{t('message.send')}</span>
            <IconSend />
          </button>
        </InputGroup>
      </Form>
    </>
  );
}

export default Input;
