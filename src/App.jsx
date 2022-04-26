import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';
import Notfound from './components/Notfound.jsx';

function App() {
  return (
    <>
      <header>
        <Link to="/" />
        <Link to="/login" className="navbar-brand">Hexlet Chat</Link>
      </header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
