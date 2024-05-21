import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './component/Auth/Register';
import Login from './component/Auth/Login';
import Dashboard from './component/Profile/Dashboard';
// import './CustomCursor.css';
// import './CustomCursor.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
