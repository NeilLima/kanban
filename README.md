# Kanban Pro

Plataforma completa de gestão de projetos e tarefas estilo Trello/Asana, com quadros Kanban interativos, trabalho em equipe em tempo real e acompanhamento de produtividade.

> **Status:** 🚧 Em desenvolvimento ativo — novas funcionalidades são adicionadas continuamente.

🔗 **Demo:** https://kanban-frontend-roan.vercel.app

---

## ✨ Funcionalidades

### Quadros e Colunas
- Quadros Kanban ilimitados por projeto, com colunas personalizáveis
- **Drag and drop** fluido para mover tarefas entre colunas e reordenar (dnd-kit)
- Limite de tarefas por coluna e ações rápidas no cartão

### Tarefas
- Título, descrição, prioridade, prazo e status
- **Checklist** interna com progresso
- **Comentários** na tarefa
- **Etiquetas (labels)** coloridas para categorização
- **Anexos** com upload de arquivos
- **Responsáveis** (múltiplos assignees por tarefa)
- **Histórico de alterações** (task history) para auditoria
- Tarefas arquivadas e lixeira com restauração

### Colaboração
- **Equipes** com membros e papéis
- **Notificações** centralizadas
- Favoritos e projetos recentes
- Perfis de usuário com avatar

### Produtividade
- **Dashboard** com visão geral dos projetos
- **Relatórios** de produtividade
- **Calendário** com prazos das tarefas
- Pesquisa e filtros avançados
- Lista de tarefas agregada (visão "tarefas")

### Experiência
- Interface moderna em **Next.js + Tailwind CSS**
- Totalmente **responsiva** (desktop e mobile)
- Autenticação JWT com refresh de sessão
- Internacionalização (PT-BR)

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Uso |
|---|---|
| **Next.js 16** | Framework React (App Router) |
| **React 19** | UI |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS 4** | Estilização utility-first |
| **@dnd-kit** | Drag and drop de tarefas |
| **TanStack Query** | Server state / cache de API |

### Backend
| Tecnologia | Uso |
|---|---|
| **NestJS 11** | API REST modular |
| **TypeScript** | Tipagem estática |
| **Prisma 6** | ORM e migrações |
| **PostgreSQL** | Banco de dados relacional |
| **JWT + Passport** | Autenticação |
| **Swagger** | Documentação da API (`/api`) |
| **class-validator** | Validação de DTOs |

---

## 🏗️ Arquitetura

```
kanban/
├── frontend/          # Next.js — interface do usuário
│   └── src/
│       ├── app/       # Rotas (App Router)
│       └── components/# Componentes por domínio
└── backend/           # NestJS — API REST + WebSocket
    └── src/modules/   # Módulos: auth, user, team, project,
                       # column, task, label, notification, report
```

**Modelo de dados principal:** `User → Profile`, `Project → ProjectMember`, `Column → Task → TaskAssignee/Label/ChecklistItem/Comment/Attachment/TaskHistory`, `Notification`.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- npm

### 1. Backend

```bash
cd backend
cp .env.example .env   # configure DATABASE_URL, JWT_SECRET etc.
npm install
npx prisma migrate dev
npm run start:dev      # API em http://localhost:4000
```

Documentação interativa da API: `http://localhost:4000/api` (Swagger).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev            # App em http://localhost:3000
```

---

## 🔮 Roadmap

- [x] Autenticação e perfis
- [x] CRUD de projetos, colunas e tarefas
- [x] Drag and drop entre colunas
- [x] Checklists, comentários, etiquetas e anexos
- [x] Equipes e notificações
- [x] Dashboard, relatórios e calendário
- [x] Lixeira e arquivamento
- [ ] Geração de PDFs/exports de relatórios
- [ ] Integrações externas (Google Calendar, Slack)
- [ ] Aplicativo mobile (PWA)

---

## 📄 Licença

Projeto desenvolvido para portfólio e fins de estudo.
