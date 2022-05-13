import React, { useEffect, useState } from 'react';
import { Nav, Button, Form, InputGroup } from 'react-bootstrap';
import i18n from 'i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import resources from '../locales/index.js';
import { fetchChats } from '../slices/chatSlice.js';
import { IconClose, IconSend } from './icon.jsx';

function ChatPage() {
  const i18next = i18n.createInstance();
  const dispatch = useDispatch();

  const channelId = useSelector((state) => state.chats.currentChannelId);
  const [currentChannelId, setCurrentChannelId] = useState(channelId);

  const channels = useSelector((state) => state.chats.channels);
  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );
  const allMessages = useSelector((state) => state.chats.messages);
  const currentMessages = allMessages.filter(
    (message) => message.id === currentChannelId,
  );
  const currentAutor = JSON.parse(localStorage.getItem('userId')).username;

  const getI18N = async () => {
    await i18next.init({
      lng: 'ru',
      debug: false,
      resources,
    });
  };
  getI18N();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      autor: currentAutor,
      text: '',
      channelId: currentChannelId,
    },
  });

  const changeCurrentChanelId = (id) => {
    setCurrentChannelId(id);
  };

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
              <IconClose />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
            {channels.map(({ id, name }) => (
              <Nav.Item as="li" className="w-100" key={id}>
                <Button
                  variant={id === currentChannelId ? 'secondary' : 'light'}
                  className="w-100 rounded-0 text-start"
                  onClick={() => {
                    changeCurrentChanelId(id);
                  }}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>#{currentChannel?.name}</b>
              </p>
              <span className="text-muted">
                {i18next.t('messages.message', {
                  count: allMessages.length,
                })}
              </span>
            </div>
            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5 "
            >
              {allMessages.map((text) => (
                <div className="text-break mb-2">{text}</div>
              ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <Form noValidate className="py-1 border rounded-2">
                <InputGroup
                  className={
                    formik.values.text === '' ? 'has-validation' : null
                  }
                >
                  <Form.Control
                    type="text"
                    name="text"
                    id="text"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-group-vertical"
                    disabled={formik.values.text === ''}
                  >
                    <span className="visually-hidden">Отправить</span>
                    <IconSend />
                  </button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
