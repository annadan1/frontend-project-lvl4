import React, { useState } from 'react';
import AuthContext from '../context/authContext.jsx';

function AuthProvider({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const token = currentUser ? currentUser.token : null;
  const [userName, setUserName] = useState(
    currentUser ? currentUser.username : null,
  );

  const loggedIn = token != null;

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUserName(data.username);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUserName(null);
  };

  const getAuthHeader = () => {
    if (userName && token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        loggedIn,
        logIn,
        logOut,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
