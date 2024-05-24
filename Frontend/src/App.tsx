// // App.tsx

// import  { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './component/Auth/Register';
// import Login from './component/Auth/Login';
// import Profile from './component/Profile/Profile';
// import Navbar from './component/NavBar/Navbar';
// import AuthContext from './contexts/AuthContext'; // Import AuthContext
// import StockDashboard from './component/Stocks/StockDashboard';
// import Watchlist from './component/Watchlist/Watchlist'; // Import Watchlist component

// const App = () => {
//   const [userName, setUserName] = useState(null);
//   const [authToken, setAuthToken] = useState(null); // Initialize authToken state

//   useEffect(() => {
//     const storedUserName = localStorage.getItem('userName');
//     const storedAuthToken = localStorage.getItem('accessToken'); // Retrieve the access token from local storage
//     if (storedUserName) {
//       setUserName(storedUserName);
//     }
//     if (storedAuthToken) {
//       setAuthToken(storedAuthToken); // Set the access token state
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userName, setUserName, authToken, setAuthToken }}> {/* Provide setAuthToken */}
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/stockdashboard" element={<StockDashboard />} />
//           <Route path="/watchlist" element={<Watchlist />} /> {/* Add Watchlist route */}

//         </Routes>
//       </Router>
//     </AuthContext.Provider>
//   );
// };

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import

import Register from './component/Auth/Register';
import Login from './component/Auth/Login';
import Profile from './component/Profile/Profile';
import Navbar from './component/NavBar/Navbar';
import AuthContext from './contexts/AuthContext';
import StockDashboard from './component/Stocks/StockDashboard';
import Watchlist from './component/Watchlist/Watchlist';

const App = () => {
  const [userName, setUserName] = useState<string | null>(null); // Added type annotation
  const [authToken, setAuthToken] = useState<string | null>(null); // Added type annotation

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const storedAuthToken = localStorage.getItem('accessToken');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userName, setUserName, authToken, setAuthToken }}>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stockdashboard" element={<StockDashboard />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
