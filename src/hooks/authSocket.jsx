import { useContext } from 'react';

import authSocket from '../context/authSocket.jsx';

const useAuth = () => useContext(authSocket);

export default useAuth;
