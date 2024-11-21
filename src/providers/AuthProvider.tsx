// src/providers/AuthProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import AuthService from '~/lib/auth-service';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { email: string; password: string; name: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authData = AuthService.getAuthData();
    if (authData.token && authData.user) {
      setIsAuthenticated(true);
      setUser(authData.user);
      Cookies.set('auth_token', authData.token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const authData = await AuthService.login(email, password);
    setIsAuthenticated(true);
    setUser(authData.user);
    if (authData.token) {
      Cookies.set('auth_token', authData.token);
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove('auth_token');
    router.push('/');
  };

  const register = async (userData: { email: string; password: string; name: string }) => {
    await AuthService.register(userData);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}