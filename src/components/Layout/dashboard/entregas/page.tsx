'use client';

import React, { useState, useEffect } from 'react';
import Layout from "~/components/Layout/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Truck, Clock, CheckCircle2, XCircle } from 'lucide-react';

// Função para gerar um número aleatório baseado em seed
const seededRandom = (seed: number, min: number, max: number): number => {
  const rng = Math.sin(seed++) * 10000;
  return Math.floor((rng - Math.floor(rng)) * (max - min + 1) + min);
};

interface Entrega {
  id: string;
  codigo: string;
  destino: string;
  status: 'pendente' | 'em_transito' | 'entregue' | 'cancelada';
  data: string;
  previsao: string;
}

// Função para gerar dados mockados
const gerarEntregasMock = (seed: number = Date.now()): Entrega[] => {
  const destinos = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Curitiba, PR',
    'Salvador, BA'
  ] as const;

  const status: Entrega['status'][] = ['pendente', 'em_transito', 'entregue', 'cancelada'];
  
  const quantidade = seededRandom(seed, 5, 10);
  
  return Array.from({ length: quantidade }, (_, index) => {
    const dataBase = new Date();
    const diasAtras = seededRandom(seed + index, 0, 15);
    dataBase.setDate(dataBase.getDate() - diasAtras);
    
    const previsaoBase = new Date(dataBase);
    const diasPrevisao = seededRandom(seed + index + 1, 2, 7);
    previsaoBase.setDate(previsaoBase.getDate() + diasPrevisao);

    const destinoIndex = seededRandom(seed + index + 2, 0, destinos.length - 1);
    const statusIndex = seededRandom(seed + index + 3, 0, status.length - 1);
    
    return {
      id: `ENT-${seed}-${index + 1}`,
      codigo: `${seededRandom(seed + index + 4, 1000, 9999)}-${seededRandom(seed + index + 5, 100, 999)}-${seededRandom(seed + index + 6, 10, 99)}`,
      destino: destinos[destinoIndex] as string,
      status: status[statusIndex]!,
      data: dataBase.toLocaleDateString('pt-BR'),
      previsao: previsaoBase.toLocaleDateString('pt-BR')
    };
  });
};

const StatusBadge = ({ status }: { status: Entrega['status'] }) => {
  const statusConfig = {
    pendente: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    em_transito: { color: 'bg-blue-100 text-blue-800', icon: Truck },
    entregue: { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    cancelada: { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.color} text-sm font-medium`}>
      <StatusIcon className="h-4 w-4" />
      {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
    </span>
  );
};

export default function EntregasPage() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);

  useEffect(() => {
    const seed = Math.floor(Math.random() * 1000000); // Seed aleatório para cada sessão
    const entregasMock = gerarEntregasMock(seed);
    setEntregas(entregasMock);
  }, []);

  const estatisticas = {
    total: entregas.length,
    pendentes: entregas.filter(e => e.status === 'pendente').length,
    emTransito: entregas.filter(e => e.status === 'em_transito').length,
    entregues: entregas.filter(e => e.status === 'entregue').length
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Entregas</h1>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total de Entregas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-500">
                  Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.pendentes}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-500">
                  Em Trânsito
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.emTransito}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-500">
                  Entregues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{estatisticas.entregues}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Entregas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Previsão</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entregas.map((entrega) => (
                    <TableRow key={entrega.id}>
                      <TableCell className="font-medium">{entrega.codigo}</TableCell>
                      <TableCell>{entrega.destino}</TableCell>
                      <TableCell>
                        <StatusBadge status={entrega.status} />
                      </TableCell>
                      <TableCell>{entrega.data}</TableCell>
                      <TableCell>{entrega.previsao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}