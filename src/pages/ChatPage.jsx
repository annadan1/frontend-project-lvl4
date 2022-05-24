import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchChats, actions } from '../slices/chatSlice.js';
import RenderChanels from '../components/Channels.jsx';
import InputForMessage from '../components/InputForMessage.jsx';
import MessageBox from '../components/Messages.jsx';
import useAuth from '../hooks/authContext.jsx';
import ShowModal from '../components/modals/index.jsx';

function ChatPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();
  const headers = auth.getAuthHeader();

  const currentChannelId = useSelector((state) => state.chats.currentChannelId);
  const channels = useSelector((state) => state.chats.channels);
  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );
  const allMessages = useSelector((state) => state.chats.messages);
  const currentMessages = allMessages.filter(
    (m) => m.currentChannelId === currentChannelId,
  );

  useEffect(() => {
    dispatch(fetchChats(headers));
  }, [dispatch]);
  const { changeChannelId } = actions;

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <RenderChanels
          props={{ channels, currentChannelId, changeChannelId }}
        />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{`# ${currentChannel?.name}`}</b>
              </p>
              <span className="text-muted">
                {t('messages.message', {
                  count: currentMessages.length,
                })}
              </span>
            </div>
            <MessageBox currentMessages={currentMessages} />
            <div className="mt-auto px-5 py-3">
              <InputForMessage currentChannelId={currentChannelId} />
            </div>
          </div>
        </div>
      </div>
      <ShowModal />
    </div>
  );
}

export default ChatPage;
