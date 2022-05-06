import { Routes, Route, Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';

import Login from './components/LoginPage.jsx';
import ChatPage from './components/ChatPage.jsx';
import Notfound from './components/NotfoundPage.jsx';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();

  return auth.loggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Hexlet Chat
            </Navbar.Brand>
          </Container>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
