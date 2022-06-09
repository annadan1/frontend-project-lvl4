import React, { useEffect, useRef } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import ru from './i18n/ru.json';
import en from './i18n/en.json';

function OnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function MyEmojiPicker(props) {
  const { locale } = props;
  const ref = useRef();
  const {
    showEmojiPicker, setShowEmojiPicker, inputValue, setInputValue,
  } = props;
  OnClickOutside(ref, () => setShowEmojiPicker(!showEmojiPicker));

  const addEmoji = ({ native }) => {
    setInputValue(inputValue + native);
  };

  return (
    <div style={{ textAlign: 'right' }}>
      <div ref={ref} style={{ float: 'right', display: 'contents' }}>
        <Picker
          showPreview={false}
          showSkinTones={false}
          style={{ textAlign: 'start' }}
          onSelect={(emojiTag) => addEmoji(emojiTag)}
          i18n={locale === 'ru' ? ru : en}
          native
          autoFocus
        />
      </div>
    </div>
  );
}

export default MyEmojiPicker;
