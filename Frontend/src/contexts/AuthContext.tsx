import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  authToken: null,
  userName: null,
  setAuthToken: () => {},
  setUserName: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const name = localStorage.getItem('userName');
    if (token) {
      setAuthToken(token);
    }
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, userName, setAuthToken, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;