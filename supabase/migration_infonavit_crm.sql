-- SEN-57 + SEN-88: CRM unificado para funnel INFONAVIT
-- Idempotente: crea tabla `leads` si no existe y agrega columnas faltantes.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null,
  funnel_stage text check (funnel_stage in ('top','middle','bottom')),
  nombre text,
  email text,
  telefono text,
  modalidad_interes text,
  tiene_terreno_propio boolean,
  interes_fase3_construccion boolean,
  infonavit_puntos numeric,
  infonavit_salario numeric,
  infonavit_modalidad text,
  tema text,
  horario text,
  payload jsonb,
  user_agent text,
  notified_carolina_at timestamptz,
  contacted_at timestamptz,
  status text not null default 'new'
);

-- Columns added for SEN-57 (safe re-run)
alter table public.leads add column if not exists funnel_stage text;
alter table public.leads add column if not exists modalidad_interes text;
alter table public.leads add column if not exists tiene_terreno_propio boolean;
alter table public.leads add column if not exists interes_fase3_construccion boolean;
alter table public.leads add column if not exists infonavit_puntos numeric;
alter table public.leads add column if not exists infonavit_salario numeric;
alter table public.leads add column if not exists infonavit_modalidad text;
alter table public.leads add column if not exists tema text;
alter table public.leads add column if not exists horario text;
alter table public.leads add column if not exists payload jsonb;
alter table public.leads add column if not exists user_agent text;
alter table public.leads add column if not exists notified_carolina_at timestamptz;
alter table public.leads add column if not exists contacted_at timestamptz;
alter table public.leads add column if not exists status text not null default 'new';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_funnel_stage_idx on public.leads (funnel_stage);
create index if not exists leads_status_idx on public.leads (status);

-- Vista para Carolina: leads nuevos sin contactar, orden por más recientes
create or replace view public.leads_carolina_inbox as
select
  id,
  created_at,
  source,
  funnel_stage,
  nombre,
  email,
  telefono,
  modalidad_interes,
  tema,
  horario,
  status,
  notified_carolina_at,
  contacted_at
from public.leads
where status in ('new','in_progress')
order by created_at desc;

-- RLS: la tabla solo se escribe vía service role (API routes). No exponer en cliente.
alter table public.leads enable row level security;

-- No policies = solo service_role puede leer/escribir. Carolina accede vía Supabase Studio o la vista en dashboard interno.

comment on table public.leads is 'CRM unificado funnel INFONAVIT/hipotecas (SEN-57, SEN-88)';
comment on view public.leads_carolina_inbox is 'Vista operativa Carolina: leads sin contactar, recientes primero';
