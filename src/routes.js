// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPath: () => [prefix, 'login'].join('/'),
  usersPath: () => [prefix, 'data'].join('/'),
  signUpPath: () => [prefix, 'signup'].join('/'),
};
