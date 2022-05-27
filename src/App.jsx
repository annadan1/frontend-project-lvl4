import {
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Navbar,
  Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Login from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Notfound from './pages/NotfoundPage.jsx';
import useAuth from './hooks/authContext.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import SignUp from './pages/SignUpPage.jsx';

function AuthButton() {
  const auth = useAuth();
  const { t } = useTranslation();
  if (auth.loggedIn) {
    return <Button onClick={auth.logOut}>{t('signOut')}</Button>;
  }
  return null;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to="/login" />;
}

function App() {
  const { i18n } = useTranslation();
  const toggle = (lng) => i18n.changeLanguage(lng);
  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" bg="white" variant="light" className="shadow-sm">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Hexlet Chat
            </Navbar.Brand>
            <ButtonGroup
              size="sm"
              style={{ display: 'block', marginLeft: 'auto' }}
            >
              <Button
                id="ru"
                variant="link"
                onClick={(e) => {
                  toggle(e.target.id);
                }}
              >
                Ru
              </Button>
              /
              <Button
                id="en"
                variant="link"
                onClick={(e) => {
                  toggle(e.target.id);
                }}
              >
                En
              </Button>
            </ButtonGroup>
            <AuthButton />
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
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
