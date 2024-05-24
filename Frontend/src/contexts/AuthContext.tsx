// import { createContext, useState, useEffect } from 'react';

// const AuthContext = createContext({
//   authToken: null,
//   userName: null,
//   setAuthToken: () => {},
//   setUserName: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(null);
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     const name = localStorage.getItem('userName');
//     if (token) {
//       setAuthToken(token);
//     }
//     if (name) {
//       setUserName(name);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ authToken, userName, setAuthToken, setUserName }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  authToken: string | null;
  userName: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  authToken: null,
  userName: null,
  setAuthToken: () => {},
  setUserName: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

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
