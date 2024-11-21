'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useAuth } from '~/providers/AuthProvider';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      await register({ email, password, name });
      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Nome completo"
              />
            </div>
            
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
              />
            </div>

            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Senha"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
            
            <div className="text-sm text-center text-gray-400">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Faça login aqui
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}