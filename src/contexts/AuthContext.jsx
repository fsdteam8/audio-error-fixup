import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('readwell_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, isTeacher = false) => {
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      isTeacher,
      joinedAt: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('readwell_user', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  const register = (email, password, name, isTeacher = false) => {
    const userData = {
      id: Date.now(),
      email,
      name,
      isTeacher,
      joinedAt: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('readwell_user', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('readwell_user');
  };

  const signInWithGoogle = async () => {
    toast({
      title: 'Supabase Integration Required',
      description: 'To enable Google Sign-In, please connect your Supabase account through the Integrations panel.',
      variant: 'destructive',
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    signInWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};