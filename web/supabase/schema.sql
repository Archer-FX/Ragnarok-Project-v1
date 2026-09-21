-- ============================================================
-- MIFANSUB CORE — ESQUEMA DE BASE DE DATOS (Supabase / Postgres)
-- Ejecutar completo en: Supabase Dashboard -> SQL Editor -> New query
-- ============================================================

-- Extensión necesaria para gen_random_uuid()
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- 1. PROYECTOS (series: anime, hentai, manga, manhwa, película)
-- ------------------------------------------------------------
create table if not exists proyectos (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  slug text unique not null,
  tipo text check (tipo in ('ANIME', 'HENTAI', 'MANGA', 'MANHWA', 'PELICULA', 'SERIE')) not null,
  estado text check (estado in ('TRABAJANDO', 'FINALIZADO', 'PAUSADO', 'CANCELADO')) not null default 'TRABAJANDO',
  portada_url text,
  año integer not null,
  temporada text,
  generos text[] default '{}',
  episodio_actual integer default 1,
  horario text, -- ej: "Jueves 19:30 JST"

  -- Progreso por fase (0-100). Para MANGA/MANHWA se reutilizan como fases de edición gráfica.
  progreso_tl integer default 0,   -- Traducción
  progreso_cr integer default 0,   -- Corrección / TLC
  progreso_sinc integer default 0, -- Sincronía / Timing
  progreso_qc integer default 0,   -- Control de calidad

  es_adulto boolean default false, -- activa el blur automático de portada en el catálogo

  -- Referencia al Embed persistente de Discord, para que el bot pueda hacer .edit()
  -- sobre el mismo mensaje en vez de publicar uno nuevo cada vez.
  discord_canal_id text,
  discord_mensaje_id text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_proyectos_tipo on proyectos(tipo);
create index if not exists idx_proyectos_estado on proyectos(estado);
create index if not exists idx_proyectos_slug on proyectos(slug);

-- ------------------------------------------------------------
-- 2. STAFF (equipo, sincronizado con Discord)
-- ------------------------------------------------------------
create table if not exists staff (
  discord_id text primary key,
  username text not null,
  avatar_url text,
  rango text not null default 'Staff', -- ej: Traductor, Corrector, Editor, Admin
  especialidades text[] default '{}',  -- ['TL','CR','SINC','QC','TS','ED','TM']
  estado_afk boolean default false,
  afk_desde date,
  afk_hasta date,
  episodios_completados integer default 0,
  medallas text[] default '{}',
  es_admin boolean default false, -- controla acceso al panel (junto con admins_permitidos)
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 3. ASIGNACIONES (relación staff <-> proyecto <-> fase)
-- ------------------------------------------------------------
create table if not exists asignaciones (
  id bigint generated always as identity primary key,
  proyecto_id uuid references proyectos(id) on delete cascade,
  staff_id text references staff(discord_id) on delete cascade,
  fase_asignada text not null, -- 'TL','CR','SINC','QC','TS','ED','TM'
  created_at timestamptz default now(),
  unique(proyecto_id, staff_id, fase_asignada)
);

-- ------------------------------------------------------------
-- 4. ADMINS PERMITIDOS (control de acceso al panel vía Discord OAuth2)
--    Aquí se define quién puede iniciar sesión en el panel web.
-- ------------------------------------------------------------
create table if not exists admins_permitidos (
  discord_id text primary key,
  nota text, -- ej: "Fundador", "Editor jefe"
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 5. AJUSTES DEL SISTEMA (llaves, dominios permitidos para iFrame, tema)
-- ------------------------------------------------------------
create table if not exists ajustes (
  clave text primary key,
  valor jsonb not null,
  updated_at timestamptz default now()
);

-- Valores por defecto
insert into ajustes (clave, valor) values
  ('dominios_iframe_permitidos', '["*"]'),
  ('tema_visual', '"cyber-glass"'),
  ('canal_discord_progreso', 'null')
on conflict (clave) do nothing;

-- ------------------------------------------------------------
-- 6. LOGS DE AUDITORÍA (quién cambió qué, para poder deshacer)
-- ------------------------------------------------------------
create table if not exists logs_auditoria (
  id bigint generated always as identity primary key,
  proyecto_id uuid references proyectos(id) on delete cascade,
  staff_id text references staff(discord_id) on delete set null,
  campo text not null,        -- ej: 'progreso_tl'
  valor_anterior text,
  valor_nuevo text,
  origen text default 'web',  -- 'web' | 'discord' | 'iframe'
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 7. TRIALS / APRENDICES (avances pendientes de aprobación de un mentor)
-- ------------------------------------------------------------
create table if not exists trials_pendientes (
  id bigint generated always as identity primary key,
  proyecto_id uuid references proyectos(id) on delete cascade,
  staff_id text references staff(discord_id) on delete cascade,
  mentor_id text references staff(discord_id) on delete set null,
  campo text not null,
  valor_propuesto integer not null,
  aprobado boolean default false,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- FUNCIÓN + TRIGGER: actualizar "updated_at" automáticamente
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_proyectos_updated_at on proyectos;
create trigger trg_proyectos_updated_at
before update on proyectos
for each row execute function set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- El panel usa la Service Role Key en el servidor (Next.js API routes /
-- Server Actions), así que RLS no lo bloquea a él. Estas políticas
-- protegen la base de datos si alguien llama a la API pública de Supabase
-- directamente (ej. desde el widget iFrame con la anon key).
-- ============================================================
alter table proyectos enable row level security;
alter table staff enable row level security;
alter table asignaciones enable row level security;
alter table admins_permitidos enable row level security;
alter table ajustes enable row level security;
alter table logs_auditoria enable row level security;
alter table trials_pendientes enable row level security;

-- Lectura pública de proyectos y staff (el widget iFrame y el catálogo lo necesitan)
drop policy if exists "lectura_publica_proyectos" on proyectos;
create policy "lectura_publica_proyectos" on proyectos for select using (true);

drop policy if exists "lectura_publica_staff" on staff;
create policy "lectura_publica_staff" on staff for select using (true);

drop policy if exists "lectura_publica_asignaciones" on asignaciones;
create policy "lectura_publica_asignaciones" on asignaciones for select using (true);

-- El resto de tablas (admins, ajustes, logs, trials) NO se exponen con la anon key:
-- no se crean políticas de select/insert/update para ellas, por lo que sólo
-- son accesibles con la Service Role Key desde el servidor de Next.js o el bot.
