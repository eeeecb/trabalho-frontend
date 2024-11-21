// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import AuthService from '~/lib/auth-service';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const auth = AuthService.isAuthenticated();
      setIsAuthenticated(auth);
      setIsLoading(false);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return { isAuthenticated, isLoading };
}