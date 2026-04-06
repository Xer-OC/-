-- SocialFarm foundational relational schema for local infrastructure boot.

create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  username text not null unique,
  display_name text not null,
  avatar_url text,
  bio text,
  public_key text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists auth_accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  provider text not null,
  provider_uid text not null,
  password_hash text,
  created_at timestamptz not null default now(),
  unique(provider, provider_uid)
);

create table if not exists devices (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  device_id text not null unique,
  device_type text not null,
  push_token text,
  last_active timestamptz not null default now()
);

create table if not exists friendships (
  id uuid primary key default uuid_generate_v4(),
  requester_id uuid not null references users(id) on delete cascade,
  receiver_id uuid not null references users(id) on delete cascade,
  status text not null,
  created_at timestamptz not null default now(),
  unique(requester_id, receiver_id)
);

create table if not exists blocks (
  user_id uuid not null references users(id) on delete cascade,
  blocked_user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, blocked_user_id)
);

create table if not exists presence (
  user_id uuid primary key references users(id) on delete cascade,
  status text not null,
  last_active timestamptz not null default now(),
  device_id text
);

create table if not exists conversations (
  id uuid primary key default uuid_generate_v4(),
  type text not null,
  created_at timestamptz not null default now()
);

create table if not exists conversation_members (
  conversation_id uuid not null references conversations(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references users(id) on delete cascade,
  encrypted_content text not null,
  message_type text not null,
  created_at timestamptz not null default now()
);

create table if not exists message_receipts (
  message_id uuid not null references messages(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  status text not null,
  primary key (message_id, user_id)
);

create table if not exists rooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  owner_id uuid not null references users(id) on delete cascade,
  topic text,
  created_at timestamptz not null default now()
);

create table if not exists room_members (
  room_id uuid not null references rooms(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table if not exists room_video_sessions (
  id uuid primary key default uuid_generate_v4(),
  room_id uuid not null references rooms(id) on delete cascade,
  video_source text not null,
  video_url text not null,
  started_at timestamptz not null default now()
);

create table if not exists videos (
  id uuid primary key default uuid_generate_v4(),
  source text not null,
  external_id text not null,
  title text not null,
  thumbnail text,
  url text not null,
  duration int not null,
  created_at timestamptz not null default now(),
  unique(source, external_id)
);

create table if not exists video_views (
  user_id uuid not null references users(id) on delete cascade,
  video_id uuid not null references videos(id) on delete cascade,
  watch_time int not null,
  created_at timestamptz not null default now(),
  primary key (user_id, video_id, created_at)
);

create table if not exists farms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  level int not null default 1,
  growth numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists farm_members (
  farm_id uuid not null references farms(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null,
  joined_at timestamptz not null default now(),
  primary key (farm_id, user_id)
);

create table if not exists farm_actions (
  id uuid primary key default uuid_generate_v4(),
  farm_id uuid not null references farms(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  action_type text not null,
  created_at timestamptz not null default now()
);

create table if not exists wallets (
  user_id uuid primary key references users(id) on delete cascade,
  coins int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  amount int not null,
  type text not null,
  reference_id text,
  created_at timestamptz not null default now()
);

create table if not exists items (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  effect text not null,
  rarity text not null
);

create table if not exists user_items (
  user_id uuid not null references users(id) on delete cascade,
  item_id uuid not null references items(id) on delete cascade,
  quantity int not null default 0,
  primary key (user_id, item_id)
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  payload jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists activities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid not null references users(id) on delete cascade,
  target_user_id uuid not null references users(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists external_message_links (
  id uuid primary key default uuid_generate_v4(),
  internal_message_id text not null,
  external_message_id text not null,
  source_app text not null,
  created_at timestamptz not null default now()
);

create table if not exists message_index (
  id uuid primary key default uuid_generate_v4(),
  message_id text not null,
  content text not null,
  sender_name text not null,
  source_app text not null,
  timestamp timestamptz not null
);

create table if not exists external_threads (
  id uuid primary key default uuid_generate_v4(),
  source_app text not null,
  external_thread_id text not null,
  internal_conversation_id text not null
);

alter table users add column if not exists provider text not null default 'email';
alter table users add column if not exists provider_user_id text not null default '';
alter table users add column if not exists linked_accounts jsonb not null default '[]'::jsonb;

create table if not exists installed_plugins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  plugin_id text not null,
  enabled boolean not null default true,
  installed_at timestamptz not null default now()
);

create table if not exists agent_memory (
  id uuid primary key default uuid_generate_v4(),
  agent_id text not null,
  conversation_id text not null,
  memory_data jsonb not null,
  updated_at timestamptz not null default now()
);
