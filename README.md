# Quality Manager AI Copilot Elite

<div align="center">
  <img src="https://img.shields.io/badge/Status-Development-orange" alt="Status">
  <img src="https://img.shields.io/badge/Version-2.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-Personal%20Use-green" alt="License">
</div>

## Vision

Quality Manager AI Copilot Elite is a **Personal Industrial AI Operating System** designed for Quality Managers, QA/QC Engineers, and Industrial professionals. It combines:

- 🏭 **Deep Industrial Knowledge** — Built from real factory experience
- 📋 **ISO & Standards Expertise** — ISO 9001, ISO 14001, ISO 45001, and more
- 🔍 **Smart Knowledge Retrieval** — Vector search with hybrid semantic + keyword matching
- 🤖 **AI Agents** — Specialized agents for Audit, RCA, CAPA, Factory Operations, Interviews, KPI, Standards, and Document Generation
- 📊 **KPI Intelligence** — Quality metrics and trend analysis
- 📝 **Smart Document Generation** — NCR, CAPA, Audit Reports, and more

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     PWA Frontend (Next.js)                      │
├─────────────────────────────────────────────────────────────────┤
│                    Agent Runtime Layer                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │AG-AUDIT │ │AG-RCA   │ │AG-CAPA  │ │AG-FACTORY│ │AG-KPI  │    │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                              │
│  │AG-STNDRD│ │AG-INTRVW│ │AG-DOCGEN│                              │
│  └─────────┘ └─────────┘ └─────────┘                              │
├─────────────────────────────────────────────────────────────────┤
│                  AI Retrieval Layer                              │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │         Hybrid Search (Semantic + Keyword + Rerank)      │    │
│  └─────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                  Knowledge Layer                                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │  Industrial  │ │   Standards  │ │   Operations │           │
│  │  Knowledge    │ │    Base      │ │     Base      │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
├─────────────────────────────────────────────────────────────────┤
│                  Data Layer                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                   │
│  │PostgreSQL│ │ Qdrant  │ │  Redis  │ │  Ollama  │               │
│  └────────┘ └────────┘ └────────┘ └────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14 + shadcn/ui | PWA Application |
| **Backend** | NestJS + Prisma | API & ORM |
| **Database** | PostgreSQL | Relational Data |
| **Vector DB** | Qdrant | Semantic Search |
| **Cache** | Redis | Session & Retrieval Cache |
| **AI Runtime** | LangChain.js + OpenAI/Ollama | AI Agents |
| **Deployment** | Docker Compose | Container orchestration |

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+
- OpenAI API Key (or Ollama for local)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo>
   cd quality-manager-ai
   ```

2. **Setup environment**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your API keys
   ```

3. **Start services**
   ```bash
   cd docker
   docker-compose up -d
   ```

4. **Setup backend**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma db push
   npm run start:dev
   ```

5. **Setup frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Access application**
   - Frontend: http://localhost:3001
   - API: http://localhost:3000
   - Qdrant Dashboard: http://localhost:6333/dashboard

## Project Structure

```
quality-manager-ai/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication
│   │   │   ├── knowledge/   # Knowledge management
│   │   │   ├── ingestion/   # Document ingestion
│   │   │   └── search/      # Retrieval engine
│   │   ├── common/          # Shared utilities
│   │   └── config/         # Configuration
│   ├── prisma/              # Database schema
│   └── package.json
├── frontend/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # UI components
│   │   └── lib/            # Utilities
│   └── package.json
├── docker/                  # Docker configuration
├── docs/                    # Documentation
└── knowledge-base/          # Knowledge files
```

## Features

### 🔍 Smart Knowledge Search
- Hybrid retrieval combining semantic vector search with keyword matching
- Intelligent query classification
- Context-aware responses

### 🤖 AI Agents

| Agent | Purpose |
|-------|---------|
| **AG-AUDIT** | Internal & ISO audits |
| **AG-RCA** | Root Cause Analysis |
| **AG-CAPA** | Corrective & Preventive Actions |
| **AG-FACTORYOPS** | Production troubleshooting |
| **AG-KPI** | Quality metrics & analytics |
| **AG-STANDARDS** | ISO interpretation |
| **AG-INTERVIEW** | Interview preparation |
| **AG-DOCGEN** | Document generation |

### 📊 KPI Dashboard
- Quality metrics tracking
- Trend visualization
- Performance benchmarking

### 📝 Document Generator
- NCR reports
- CAPA reports
- Audit reports
- Inspection reports

## Development Phases

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 0 | ✅ Planning | Foundation architecture |
| Phase 1 | 🔄 Active | Database & Auth |
| Phase 2 | ⏳ Pending | Knowledge Ingestion |
| Phase 3 | ⏳ Pending | Retrieval Engine |
| Phase 4 | ⏳ Pending | Agent Runtime |
| Phase 5 | ⏳ Pending | PWA Frontend |
| Phase 6 | ⏳ Pending | Observability |
| Phase 7 | ⏳ Pending | Knowledge Expansion |
| Phase 8 | ⏳ Pending | Polish & Optimization |

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get current user

### Knowledge Management
- `GET /knowledge` - List all knowledge objects
- `POST /knowledge` - Create new knowledge object
- `GET /knowledge/:id` - Get specific object
- `PUT /knowledge/:id` - Update object
- `DELETE /knowledge/:id` - Delete object

### Document Ingestion
- `POST /ingestion/upload` - Upload document
- `GET /ingestion/status/:id` - Check ingestion status

### Search
- `GET /search` - Hybrid search
- `POST /search/classify` - Classify query
- `GET /search/context` - Get context assembly

## RBAC Roles

| Role | Code | Permissions |
|------|------|-------------|
| Owner | `OWNER` | Full system access |
| Quality Manager | `QUALITY_MANAGER` | All QMS modules |
| Auditor | `AUDITOR` | Audit management |
| QC Engineer | `QC_ENGINEER` | Inspections & NCRs |
| Viewer | `VIEWER` | Read-only access |

## Contributing

This is a personal project for Quality Management professionals. Contributions welcome!

## License

Personal Use Only — Mahmoud Elhalawany

---

<div align="center">
  <strong>Built for Quality Managers, by a Quality Manager</strong>
</div>
