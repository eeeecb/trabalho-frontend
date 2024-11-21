"use client";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { 
  Truck, 
  Rocket, 
  Shield, 
  PiggyBank, 
  Box, 
  Radar, 
  PlaneTakeoff,
  PackageCheck,
  Calculator
} from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "~/providers/AuthProvider";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

// Interface para as props do CircularProgress
interface CircularProgressProps {
  percentage: number;
  label: string;
  color: string;
  bgColor: string;
}

// Novo componente CircularProgress com tipagem adequada
const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, label, color, bgColor }) => {
  const radius = 38;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-12">
        <svg className="w-24 h-12" viewBox="0 0 96 48">
          <path
            d="M 8,48 a 40,40 0 0 1 80,0"
            stroke={bgColor}
            strokeWidth="4"
            fill="transparent"
            className="opacity-25"
          />
          <path
            d="M 8,48 a 40,40 0 0 1 80,0"
            stroke={color}
            strokeWidth="4"
            fill="transparent"
            style={{
              strokeDasharray: `${circumference}`,
              strokeDashoffset,
            }}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-300 text-center max-w-[120px]">
        {label}
      </span>
    </div>
  );
};

const ProgressStats: React.FC = () => {
  return (
    <div className="flex justify-center space-x-8">
      <CircularProgress
        percentage={78}
        label="Entregas no Prazo"
        color="#3B82F6"
        bgColor="#1D4ED8"
      />
      <CircularProgress
        percentage={85}
        label="Satisfação dos Clientes"
        color="#FBBF24"
        bgColor="#B45309"
      />
    </div>
  );
};

// Interface para serviços
interface Service {
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

export function BlockPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const services: Service[] = [
    {
      name: "TRANSPORTE DEDICADO",
      description: "Frota exclusiva dimensionada para sua operação, com veículos personalizados, rastreamento 24h e equipe especializada. Ideal para operações regulares que exigem alto nível de personalização e controle",      
      icon: Truck
    },
    {
      name: "TRANSPORTE FRACIONADO",
      description: "Coletas e entregas programadas para cargas fracionadas, com consolidação em terminais estratégicos, rastreamento por unidade e gestão de última milha em centros urbanos",
      icon: PackageCheck
    },
    {
      name: "CARGAS ESPECIAIS",
      description: "Transporte especializado para cargas indivisíveis, perigosas ou que necessitam de temperatura controlada, com equipamentos dedicados e licenças específicas",
      icon: Shield
    },
    {
      name: "LOGÍSTICA INTERNACIONAL",
      description: "Operações door-to-door com desembaraço aduaneiro, consolidação de cargas, agenciamento de frete internacional e assessoria em comércio exterior",
      icon: PlaneTakeoff
    }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-transparent px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-gray-700" />
            <span className="text-gray-700 text-xl font-bold">Transportadora ABC</span>
          </div>
          <div className="flex space-x-4">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => router.push("/register")}
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  Sair
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/truck.jpg"
            alt="Transportation background"
            fill
            className="object-cover opacity-50"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
        </div>

        <div className="container relative mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-bold md:text-6xl"
          >
            CONECTANDO O BRASIL
            <br />
            COM SEGURANÇA E AGILIDADE
          </motion.h1>

          <p className="mb-8 text-xl text-gray-300">
            Conectando o Brasil com segurança e agilidade
            <br />
            Cobertura nacional, performance e rastreio excepcional.
          </p>

          {/* Substituindo os círculos antigos pelo novo componente ProgressStats */}
          <div className="mb-12">
            <ProgressStats />
          </div>

          <div className="mb-12 flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Saiba Mais sobre Nossos Serviços
            </Button>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Solicite um Orçamento
            </Button>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { name: "TRANSPORTE RÁPIDO", icon: Rocket },
              { name: "TRANSPORTE SEGURO", icon: Shield },
              { name: "TRANSPORTE ECONÔMICO", icon: PiggyBank },
              { name: "LOGÍSTICA E DISTRIBUIÇÃO", icon: Box },
              { name: "RASTREIO EM TEMPO REAL", icon: Radar },
            ].map(({ name, icon: Icon }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="mx-auto mb-2 h-12 w-12 text-white" />
                <p className="text-sm font-medium">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">Nossos Serviços</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Quote Form - Atualizado com cores de texto mais escuras */}
            <div id="quote-form" className="bg-gray-50 rounded-lg shadow-xl p-8">
              <div className="text-center mb-6">
                <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Solicite seu Orçamento</h3>
                <p className="text-gray-600">Preencha o formulário abaixo e entraremos em contato</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Nome Completo
                    </label>
                    <Input
                      required
                      type="text"
                      placeholder="Seu nome completo"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Empresa
                    </label>
                    <Input
                      required
                      type="text"
                      placeholder="Nome da sua empresa"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Telefone
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="(00) 00000-0000"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Tipo de Serviço
                  </label>
                  <Select required>
                    <SelectTrigger className="bg-white text-gray-900">
                      <SelectValue placeholder="Selecione o tipo de serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dedicated">Transporte Dedicado</SelectItem>
                      <SelectItem value="storage">Armazenagem e Distribuição</SelectItem>
                      <SelectItem value="express">Cargas Expressas</SelectItem>
                      <SelectItem value="logistics">Gestão Logística</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Origem
                    </label>
                    <Input
                      required
                      type="text"
                      placeholder="Cidade de origem"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                      Destino
                    </label>
                    <Input
                      required
                      type="text"
                      placeholder="Cidade de destino"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Detalhes da Carga
                  </label>
                  <Textarea
                    required
                    placeholder="Descreva os detalhes da sua carga (peso, dimensões, quantidade, etc)"
                    className="w-full h-24 bg-white text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={formSubmitted}
                >
                  {formSubmitted ? "Enviado com Sucesso!" : "Enviar Solicitação"}
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {services.map((service) => (
                <Card key={service.name} id={service.name.toLowerCase().replace(/\s+/g, '-')}>
                  <CardContent className="flex items-center p-6">
                    <service.icon className="mr-4 h-12 w-12 text-blue-600" />
                    <div>
                      <h3 className="mb-2 text-lg font-bold">{service.name}</h3>
                      <p className="text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            © {new Date().getFullYear()} Transportadora ABC - Todos os direitos reservados
          </div>
        </div>
      </footer>
    </div>
  );
}