import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchChats, actions } from '../slices/chatSlice.js';
import { IconAdd } from './icon.jsx';
import RenderChanels from './Channels.jsx';
import InputForMessage from './InputForMessage.jsx';
import MessageBox from './Messages.jsx';
import useAuth from '../hooks/authContext.jsx';

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
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
            >
              <IconAdd />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <RenderChanels
            props={{ channels, currentChannelId, changeChannelId }}
          />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {currentChannel?.name}
                </b>
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
    </div>
  );
}

export default ChatPage;
