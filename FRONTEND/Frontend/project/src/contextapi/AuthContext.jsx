import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component to manage login states and user data
export function AuthProvider({ children }) {
  // Load initial state from localStorage or default to false/null
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(() => {
    return localStorage.getItem('isCustomerLoggedIn') === 'true';
  });

  const [isManagerLoggedIn, setIsManagerLoggedIn] = useState(() => {
    return localStorage.getItem('isManagerLoggedIn') === 'true';
  });

  const [isDonorLoggedIn, setIsDonorLoggedIn] = useState(() => {
    return localStorage.getItem('isDonorLoggedIn') === 'true';
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    localStorage.setItem('isCustomerLoggedIn', isCustomerLoggedIn);
    localStorage.setItem('isManagerLoggedIn', isManagerLoggedIn);
    localStorage.setItem('isDonorLoggedIn', isDonorLoggedIn);
  }, [isAdminLoggedIn, isCustomerLoggedIn, isManagerLoggedIn, isDonorLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isCustomerLoggedIn,
        setIsCustomerLoggedIn,
        isManagerLoggedIn,
        setIsManagerLoggedIn,
        isDonorLoggedIn,
        setIsDonorLoggedIn,  // Added this line
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);
