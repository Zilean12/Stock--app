import React, { createContext, useContext, useEffect, useState } from 'react';

// Define types for user data
interface UserData {
  name: string;
  email: string;
}

// Define type for context value
interface AuthContextValue {
  token: string | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  login: (newToken: string, newData: UserData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const storedData = JSON.parse(localStorage.getItem('user_data') || 'null');

  useEffect(() => {
    if (storedData) {
      const { userToken, user } = storedData;
      setToken(userToken);
      setUserData(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string, newData: UserData) => {
    localStorage.setItem('user_data', JSON.stringify({
      userToken: newToken,
      user: newData,
    }));
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextValue = {
    token,
    userData,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
