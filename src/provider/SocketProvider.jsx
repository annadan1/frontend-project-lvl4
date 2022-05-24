import React from 'react';
import SocketContext from '../context/authSocket.jsx';

const promisify = (socketFunction) => (...args) => new Promise((resolve, reject) => {
  socketFunction(...args, ({ status, data }) => {
    if (status !== 'ok') {
      reject(new Error('Ошибка сети'));
    }
    resolve(data);
  });
});

function SocketProvider({ socket, children }) {
  const addMessage = promisify((...args) => socket.emit('newMessage', ...args));
  const addChannel = promisify((...args) => socket.emit('newChannel', ...args));
  const renameChannel = promisify((...args) => socket.emit('renameChannel', ...args));
  const removeChannel = promisify((...args) => socket.emit('removeChannel', ...args));

  return (
    <SocketContext.Provider
      value={{
        addMessage,
        addChannel,
        renameChannel,
        removeChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
