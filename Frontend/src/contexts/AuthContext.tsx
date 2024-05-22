// AuthContext.tsx

import React from 'react';

interface AuthContextType {
  userName: string | null;
  setUserName: (value: string | null) => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default AuthContext; // This line exports AuthContext as the default export