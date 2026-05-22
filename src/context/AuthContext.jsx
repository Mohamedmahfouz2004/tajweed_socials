import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('tajweedAdminToken') || null);
  const [userRole, setUserRole] = useState(token ? 'admin' : 'guest');

  const login = async (password) => {
    try {
      const res = await fetch('http://localhost:4002/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const result = await res.json();
      if (result.success) {
        setToken(result.token);
        setUserRole('admin');
        localStorage.setItem('tajweedAdminToken', result.token);
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'خطأ في الاتصال بالخادم' };
    }
  };

  const logout = () => {
    setToken(null);
    setUserRole('guest');
    localStorage.removeItem('tajweedAdminToken');
  };

  return (
    <AuthContext.Provider value={{ token, userRole, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
