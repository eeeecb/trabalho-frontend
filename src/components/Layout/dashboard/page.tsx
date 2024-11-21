"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface DashboardData {
  pedidosRecentes: number;
  entregasEmAndamento: number;
  faturamentoTotal: number;
  ticketMedio: number;
}

interface DadosMensais {
  mes: string;
  pedidos: number;
  entregas: number;
  faturamento: number;
}

const gerarDadosMock = (seed: number) => {
  const seededRandom = (
    min: number,
    max: number,
    offset = 0  // Removed explicit type as it can be inferred
  ) => {
    const rng = Math.sin(seed + offset) * 10000;
    return Math.floor((rng - Math.floor(rng)) * (max - min + 1) + min);
  };

  // Dados dos últimos 6 meses
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const dadosMensais = meses.map((mes, index) => {
    const pedidos = seededRandom(30, 100, index);
    const entregas = Math.floor(pedidos * (0.8 + Math.random() * 0.2));
    const faturamento = pedidos * seededRandom(200, 500, index + meses.length);

    return {
      mes,
      pedidos,
      entregas,
      faturamento,
    };
  });

  // Cálculo do total e médias
  const totalPedidos = dadosMensais.reduce(
    (acc, curr) => acc + curr.pedidos,
    0
  );
  const totalFaturamento = dadosMensais.reduce(
    (acc, curr) => acc + curr.faturamento,
    0
  );

  // Alertas baseados nos dados
  const alertas: string[] = [];
  
  // Safely access last two months with null checks
  const ultimoMes = dadosMensais[dadosMensais.length - 1];
  const penultimoMes = dadosMensais[dadosMensais.length - 2];

  if (ultimoMes && penultimoMes && ultimoMes.pedidos < penultimoMes.pedidos) {
    alertas.push(
      `Queda de ${Math.floor(
        (1 - ultimoMes.pedidos / penultimoMes.pedidos) * 100
      )}% nos pedidos em relação ao mês anterior`
    );
  }

  if (ultimoMes && ultimoMes.entregas / ultimoMes.pedidos < 0.85) {
    alertas.push("Taxa de entrega abaixo do esperado no último mês");
  }

  if (ultimoMes && penultimoMes && ultimoMes.faturamento < penultimoMes.faturamento) {
    alertas.push(
      `Redução de ${Math.floor(
        (1 - ultimoMes.faturamento / penultimoMes.faturamento) * 100
      )}% no faturamento em relação ao mês anterior`
    );
  }

  return {
    dashboardData: {
      pedidosRecentes: seededRandom(10, 30),
      entregasEmAndamento: seededRandom(5, 20),
      faturamentoTotal: totalFaturamento,
      ticketMedio: totalFaturamento / totalPedidos,
    },
    dadosMensais,
    alertas,
  };
};

export default function DashboardContent() {
  const [dados, setDados] = useState<{
    dashboardData: DashboardData;
    dadosMensais: DadosMensais[];
    alertas: string[];
  } | null>(null);

  useEffect(() => {
    const seed = Math.floor(Math.random() * 1000000);
    const dadosMock = gerarDadosMock(seed);
    setDados(dadosMock);
  }, []);

  if (!dados) return null;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="space-y-6">
        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pedidos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">
                {dados.dashboardData.pedidosRecentes}
              </div>
              <Package className="h-6 w-6 text-blue-500" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Entregas em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">
                {dados.dashboardData.entregasEmAndamento}
              </div>
              <Truck className="h-6 w-6 text-green-500" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Faturamento Total
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">
                R${" "}
                {dados.dashboardData.faturamentoTotal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <DollarSign className="h-6 w-6 text-purple-500" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Ticket Médio
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">
                R${" "}
                {dados.dashboardData.ticketMedio.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <TrendingUp className="h-6 w-6 text-orange-500" />
            </CardContent>
          </Card>
        </div>

        {/* Alertas */}
        {dados.alertas.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dados.alertas.map((alerta, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-red-700"
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    {alerta}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Gráficos */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Pedidos vs Entregas</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dados.dadosMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pedidos"
                    stroke="#3b82f6"
                    name="Pedidos"
                  />
                  <Line
                    type="monotone"
                    dataKey="entregas"
                    stroke="#22c55e"
                    name="Entregas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Faturamento Mensal</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dados.dadosMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) =>
                      `R$ ${value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    }
                  />
                  <Bar
                    dataKey="faturamento"
                    fill="#a855f7"
                    name="Faturamento"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}