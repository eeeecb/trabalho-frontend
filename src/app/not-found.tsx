"use client";

import { useAuthNavigation } from "~/hooks/useAuthNavigation";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/providers/AuthProvider";
import { useEffect } from "react";

export default function NotFound() {
  const { isAuthenticated } = useAuth();
  const { safeBack } = useAuthNavigation();

  // Efeito para garantir redirecionamento adequado
  useEffect(() => {
    // Pequeno delay para garantir que o estado de autenticação foi carregado
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        safeBack();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, safeBack]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h2 className="mb-4 text-4xl font-bold">404 - Página não encontrada</h2>
      <p className="mb-8 text-gray-400">
        A página que você está procurando não existe.
      </p>
      <div className="space-x-4">
        <Button
          onClick={() => safeBack()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isAuthenticated
            ? "Voltar para o Dashboard"
            : "Voltar para a Página Inicial"}
        </Button>
      </div>
    </div>
  );
}
