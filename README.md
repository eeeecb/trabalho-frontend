# 🚚 Transportadora ABC - Sistema de Gestão

## 📝 Descrição
Sistema web para gestão de transportadora, oferecendo funcionalidades de dashboard, controle de entregas e pedidos, com interface moderna e responsiva. O sistema permite o gerenciamento completo das operações logísticas, desde o cadastro de pedidos até o acompanhamento de entregas.

## ✨ Funcionalidades

- 📊 Dashboard com métricas em tempo real
- 📦 Gestão de pedidos
- 🚚 Controle de entregas
- 📈 Gráficos e relatórios
- 🔐 Sistema de autenticação
- ⚙️ Configurações personalizadas
- 📱 Interface responsiva

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - Next.js 14
  - React.js
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui
  - Lucide Icons
  - Recharts
  - Framer Motion

- **Estilização:**
  - Tailwind CSS
  - CSS Modules
  - PostCSS
  - Autoprefixer

- **Autenticação:**
  - Local Storage

## 💻 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Node.js (v18.0.0 ou superior)
- npm ou yarn
- Git

## 🚀 Como rodar o projeto

1. Clone o repositório
```bash
git clone https://github.com/eeeecb/trabalho-frontend.git
cd trabalho-frontend
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas configurações

4. Rode o projeto em desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

5. Acesse o projeto
O projeto estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/               # Páginas da aplicação
├── components/        # Componentes reutilizáveis
├── hooks/            # Custom hooks
├── lib/              # Funções utilitárias
├── providers/        # Provedores de contexto
└── styles/           # Arquivos de estilo
```

## 🔐 Autenticação

O sistema utiliza autenticação baseada em sessão com as seguintes rotas protegidas:
- `/dashboard/*` - Todas as rotas do dashboard

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar em produção
npm start

# Rodar linter
npm run lint

# Rodar typecheck
npm run typecheck
```