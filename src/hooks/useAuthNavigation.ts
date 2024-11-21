'use client';

import { useAuth } from "~/providers/AuthProvider";
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useAuthNavigation() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const safeNavigate = useCallback((fallbackPath: string, securePath: string) => {
    if (isAuthenticated) {
      router.push(securePath);
    } else {
      router.push(fallbackPath);
    }
  }, [isAuthenticated, router]);

  const safeBack = useCallback(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return { safeNavigate, safeBack };
}