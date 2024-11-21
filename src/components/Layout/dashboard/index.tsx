"use client";

import { type PropsWithChildren } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "~/providers/AuthProvider";
import { useAuthNavigation } from "~/hooks/useAuthNavigation";
import { useEffect, useState } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  const { safeBack } = useAuthNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pequeno delay para garantir que o estado de autenticação foi carregado
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isAuthenticated) {
        safeBack();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, safeBack]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
