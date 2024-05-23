// App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './component/Auth/Register';
import Login from './component/Auth/Login';
import Profile from './component/Profile/Profile';
import Navbar from './component/NavBar/Navbar';
import AuthContext from './contexts/AuthContext'; // Import AuthContext
import StockDashboard from './component/Stocks/StockDashboard';
import Watchlist from './component/Watchlist/Watchlist'; // Import Watchlist component

const App = () => {
  const [userName, setUserName] = useState(null);
  const [authToken, setAuthToken] = useState(null); // Initialize authToken state

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedAuthToken = localStorage.getItem('accessToken'); // Retrieve the access token from local storage
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedAuthToken) {
      setAuthToken(storedAuthToken); // Set the access token state
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userName, setUserName, authToken, setAuthToken }}> {/* Provide setAuthToken */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stockdashboard" element={<StockDashboard />} />
          <Route path="/watchlist" element={<Watchlist />} /> {/* Add Watchlist route */}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;