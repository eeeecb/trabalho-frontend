"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  DollarSign,
} from "lucide-react";

// Função para gerar um número aleatório baseado em seed
const seededRandom = (seed: number, min: number, max: number): number => {
  const rng = Math.sin(seed++) * 10000;
  return Math.floor((rng - Math.floor(rng)) * (max - min + 1) + min);
};

interface Pedido {
  id: string;
  codigo: string;
  produtos: {
    nome: string;
    quantidade: number;
    preco: number;
  }[];
  status:
    | "aguardando_pagamento"
    | "pago"
    | "em_separacao"
    | "enviado"
    | "entregue"
    | "cancelado";
  data: string;
  entregaId?: string;
  valorTotal: number;
}

const produtos = [
  { nome: "Smartphone Galaxy X", preco: 2499.9 },
  { nome: "Notebook Pro", preco: 4999.9 },
  { nome: "Fone Bluetooth", preco: 299.9 },
  { nome: 'Smart TV 55"', preco: 3299.9 },
  { nome: "Tablet Ultra", preco: 1999.9 },
  { nome: "Mouse Gamer", preco: 199.9 },
  { nome: "Teclado Mecânico", preco: 399.9 },
  { nome: "Câmera Digital", preco: 1599.9 },
];

// Função para gerar dados mockados
const gerarPedidosMock = (seed: number = Date.now()): Pedido[] => {
  const status: Pedido["status"][] = [
    "aguardando_pagamento",
    "pago",
    "em_separacao",
    "enviado",
    "entregue",
    "cancelado",
  ];

  const quantidade = seededRandom(seed, 5, 12);

  return Array.from({ length: quantidade }, (_, index) => {
    const dataBase = new Date();
    const diasAtras = seededRandom(seed + index, 0, 30);
    dataBase.setDate(dataBase.getDate() - diasAtras);

    // Gera uma lista aleatória de produtos para o pedido
    const numProdutos = seededRandom(seed + index, 1, 4);
    const produtosPedido = Array.from(
      { length: numProdutos },
      (_, prodIndex) => {
        const produtoIndex = seededRandom(
          seed + index + prodIndex,
          0,
          produtos.length - 1,
        );
        const quantidade = seededRandom(seed + index + prodIndex, 1, 3);
        const produto = produtos[produtoIndex]!;
        return {
          nome: produto.nome,
          preco: produto.preco,
          quantidade,
        };
      },
    );

    const valorTotal = produtosPedido.reduce(
      (acc, prod) => acc + (prod.preco ?? 0) * prod.quantidade,
      0,
    );

    const statusIndex = seededRandom(seed + index + 3, 0, status.length - 1);
    const pedidoStatus = status[statusIndex]!;

    // Se o pedido foi enviado ou entregue, gera um ID de entrega
    const entregaId = ["enviado", "entregue"].includes(pedidoStatus)
      ? `ENT-${seed}-${index + 1}`
      : undefined;

    return {
      id: `PED-${seed}-${index + 1}`,
      codigo: `${seededRandom(seed + index + 4, 100000, 999999)}`,
      produtos: produtosPedido,
      status: pedidoStatus,
      data: dataBase.toLocaleDateString("pt-BR"),
      entregaId,
      valorTotal,
    };
  });
};

const StatusBadge = ({ status }: { status: Pedido["status"] }) => {
  const statusConfig = {
    aguardando_pagamento: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    pago: { color: "bg-green-100 text-green-800", icon: DollarSign },
    em_separacao: { color: "bg-blue-100 text-blue-800", icon: Package },
    enviado: { color: "bg-purple-100 text-purple-800", icon: Truck },
    entregue: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    cancelado: { color: "bg-red-100 text-red-800", icon: XCircle },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <span
      className={`flex items-center gap-2 rounded-full px-3 py-1 ${config.color} text-sm font-medium`}
    >
      <StatusIcon className="h-4 w-4" />
      {status.replace("_", " ").charAt(0).toUpperCase() +
        status.slice(1).replace("_", " ")}
    </span>
  );
};

export default function PedidosContent() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const seed = Math.floor(Math.random() * 1000000);
    const pedidosMock = gerarPedidosMock(seed);
    setPedidos(pedidosMock);
  }, []);

  const estatisticas = {
    total: pedidos.length,
    aguardandoPagamento: pedidos.filter(
      (p) => p.status === "aguardando_pagamento",
    ).length,
    emProcessamento: pedidos.filter((p) =>
      ["pago", "em_separacao"].includes(p.status),
    ).length,
    enviados: pedidos.filter((p) => ["enviado", "entregue"].includes(p.status))
      .length,
    valorTotal: pedidos.reduce((acc, ped) => acc + ped.valorTotal, 0),
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Pedidos</h1>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-500">
                Aguardando Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {estatisticas.aguardandoPagamento}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-500">
                Em Processamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {estatisticas.emProcessamento}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-500">
                Valor Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R${" "}
                {estatisticas.valorTotal.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Rastreio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell className="font-medium">
                      {pedido.codigo}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {pedido.produtos.map((prod, index) => (
                          <div key={index}>
                            {prod.quantidade}x {prod.nome}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      R${" "}
                      {pedido.valorTotal.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={pedido.status} />
                    </TableCell>
                    <TableCell>{pedido.data}</TableCell>
                    <TableCell>
                      {pedido.entregaId ? (
                        <span className="cursor-pointer text-blue-500 hover:underline">
                          {pedido.entregaId}
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
