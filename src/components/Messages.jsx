import React, { useEffect, useRef } from 'react';
import filter from 'leo-profanity';

function Message({ currentMessages }) {
  const messagesBoxRef = useRef();
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  });
  return (
    <div
      id="messages-box"
      className="chat-messages overflow-auto px-5 "
      ref={messagesBoxRef}
    >
      {currentMessages.map(({ author, text, id }) => (
        <div className="text-break mb-2" key={id}>
          <b>{author}</b>
          {`: ${filter.clean(text)}`}
        </div>
      ))}
    </div>
  );
}

export default Message;
