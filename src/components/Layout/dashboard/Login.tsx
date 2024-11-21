'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useAuth } from '~/providers/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  
  const justRegistered = searchParams.get('registered') === 'true';
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      router.push('/'); // Vai para a página inicial após o login
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {justRegistered && (
            <div className="mb-4 p-3 bg-green-500/10 text-green-500 text-sm rounded-md text-center">
              Conta criada com sucesso! Faça login para continuar.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={loading}
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-sm text-center text-gray-400">
              Não tem uma conta?{' '}
              <Link 
                href="/register" 
                className="text-primary hover:underline">
                Cadastre-se aqui
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}