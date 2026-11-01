# AgendaAí

SaaS de agendamento online para barbearias, salões e pequenos negócios.
Cada negócio ganha uma página pública (ex.: `agendaai.com/barbearia-do-ze`) onde o cliente marca horário, e um painel para o dono gerenciar a agenda.

## Stack (100% no plano gratuito)

| Camada | Ferramenta |
|---|---|
| Front + Back | [Next.js](https://nextjs.org) (App Router) + TypeScript |
| Estilo | [Tailwind CSS](https://tailwindcss.com) |
| Banco + Login | [Supabase](https://supabase.com) (Postgres + Auth) |
| Deploy | [Vercel](https://vercel.com) |

## Como rodar

Pré-requisitos: [Node.js 20+](https://nodejs.org) e Git.

```bash
# 1. Clonar
git clone <url-do-repo>
cd agendaai

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# edite .env.local com a URL e a anon key do seu projeto Supabase

# 4. Rodar em modo desenvolvimento
npm run dev
```

Abra http://localhost:3000.

> O site já abre sem o Supabase configurado; ele só é necessário quando começarmos login e banco.

### Banco de dados

1. Crie um projeto gratuito em https://supabase.com
2. Vá em **SQL Editor** e rode o conteúdo de `supabase/migrations/0001_init.sql`
3. Copie **Project URL** e **anon key** (Project Settings > API) para o `.env.local`

## Estrutura

```
agendaai/
├── src/
│   ├── app/                 # Rotas (cada pasta = uma URL)
│   │   ├── page.tsx         # Landing page  →  /
│   │   ├── (auth)/login/    # Login do dono →  /login
│   │   ├── painel/          # Painel do dono → /painel
│   │   └── (public)/[slug]/ # Página de agendamento do negócio → /barbearia-do-ze
│   ├── components/          # Componentes React reutilizáveis
│   ├── lib/supabase/        # Clientes do Supabase (navegador e servidor)
│   └── types/               # Tipos TypeScript
├── supabase/migrations/     # Scripts SQL do banco
├── docs/ROADMAP.md          # Plano de desenvolvimento
└── public/                  # Imagens e arquivos estáticos
```

## Scripts

- `npm run dev` – servidor de desenvolvimento
- `npm run build` – build de produção
- `npm start` – roda o build
