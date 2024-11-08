// src/app/page.tsx
import { Metadata } from "next";
import { auth } from "../server/auth";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Activity, Users, BookOpen, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | T3 Stack App",
  description: "Dashboard principal do aplicativo T3 Stack",
};

async function getPageData() {
  const session = await auth();
  
  // Aqui você pode adicionar chamadas ao seu backend/banco de dados
  // Exemplo de dados estáticos para demonstração
  const stats = {
    totalUsers: 1234,
    activeCourses: 15,
    upcomingEvents: 8,
    activeUsers: 342,
  };

  return {
    session,
    stats,
  };
}

export default async function HomePage() {
  const { session, stats } = await getPageData();

  return (
    <div className="space-y-6">
      {/* Seção de Boas-vindas */}
      <section className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          {session ? `Bem-vindo, ${session.user.name}!` : "Bem-vindo!"}
        </h1>
        <p className="text-muted-foreground">
          {session 
            ? "Veja um resumo das suas atividades e informações importantes."
            : "Faça login para acessar todas as funcionalidades."}
        </p>
      </section>

      {/* Cards de Estatísticas */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              +12.2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Ativos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">
              +2 novos cursos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              Próximos 30 dias
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Seção de Ações Rápidas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Ações Rápidas</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/cursos">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Ver Cursos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Explore nossos cursos disponíveis e comece a aprender.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/agenda">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Agenda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Veja seus próximos eventos e compromissos.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/configuracoes">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Atualize suas informações e preferências.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}