import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    displayName: 'John Doe',
    uid: 'mock-user-id'
  });

  function signInWithGoogle() {
    // Mock function
    return Promise.resolve();
  }

  function logout() {
    // Mock function
    return Promise.resolve();
  }

  const value = {
    user,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 