import { useContext } from 'react';

import socketContext from '../context/socketContext.jsx';

const useSocket = () => useContext(socketContext);

export default useSocket;
