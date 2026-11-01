-- Esquema inicial (rode no SQL Editor do Supabase)
create table businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  phone text,
  created_at timestamptz default now()
);

create table professionals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  active boolean default true
);

create table services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  duration_min int not null check (duration_min > 0),
  price_cents int not null default 0,
  active boolean default true
);

-- Horário de funcionamento por profissional (0 = domingo ... 6 = sábado)
create table working_hours (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references professionals(id) on delete cascade,
  weekday int not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  professional_id uuid not null references professionals(id),
  service_id uuid not null references services(id),
  customer_name text not null,
  customer_phone text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'confirmado' check (status in ('confirmado','cancelado','concluido')),
  created_at timestamptz default now()
);

-- Segurança (RLS): cada dono só vê os dados do próprio negócio
alter table businesses enable row level security;
alter table professionals enable row level security;
alter table services enable row level security;
alter table working_hours enable row level security;
alter table appointments enable row level security;
-- As policies serão adicionadas na próxima migration.
