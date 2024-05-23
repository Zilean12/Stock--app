// App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './component/Auth/Register';
import Login from './component/Auth/Login';
import Profile from './component/Profile/Profile';
import Navbar from './component/NavBar/Navbar';
import  AuthContext  from './contexts/AuthContext'; // Import AuthProvider
import StockDashboard from './component/Stocks/StockDashboard';

const App = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userName, setUserName }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stockdashboard" element={<StockDashboard />} />

        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;