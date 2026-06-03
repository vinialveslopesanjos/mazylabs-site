create table if not exists contacts (
  id bigserial primary key,
  chatwoot_contact_id bigint unique,
  phone_e164 text unique,
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists conversations (
  id bigserial primary key,
  chatwoot_conversation_id bigint unique not null,
  contact_id bigint references contacts(id),
  status text,
  assignee_id bigint,
  team_id bigint,
  labels text[] not null default '{}',
  agent_paused boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists messages (
  id bigserial primary key,
  chatwoot_message_id bigint unique not null,
  conversation_id bigint references conversations(id),
  contact_id bigint references contacts(id),
  direction text not null,
  message_type text,
  content text not null default '',
  private boolean not null default false,
  sender_type text,
  raw_payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists lead_memory (
  contact_id bigint primary key references contacts(id),
  company_name text,
  contact_name text,
  role text,
  pain_points text[] not null default '{}',
  services_interest text[] not null default '{}',
  urgency text,
  budget_signal text,
  stage text not null default 'new',
  summary text not null default '',
  last_handoff_reason text,
  updated_at timestamptz not null default now()
);

create table if not exists agent_runs (
  id bigserial primary key,
  run_id text unique not null,
  conversation_id bigint references conversations(id),
  contact_id bigint references contacts(id),
  chatwoot_message_id bigint,
  langsmith_run_id text,
  decision text not null,
  risk_level text not null,
  handoff_required boolean not null default false,
  input_text text not null,
  output_chunks jsonb not null default '[]',
  memory_patch jsonb not null default '{}',
  token_usage jsonb,
  raw_output jsonb,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists handoffs (
  id bigserial primary key,
  conversation_id bigint references conversations(id),
  contact_id bigint references contacts(id),
  agent_run_id bigint references agent_runs(id),
  reason text not null,
  summary text not null,
  assigned_to text,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists outbox_messages (
  id bigserial primary key,
  conversation_id bigint references conversations(id),
  contact_id bigint references contacts(id),
  agent_run_id bigint references agent_runs(id),
  content text not null,
  chatwoot_message_id bigint,
  status text not null default 'pending',
  sent_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_conversation_created on messages(conversation_id, created_at desc);
create index if not exists idx_agent_runs_conversation_created on agent_runs(conversation_id, created_at desc);
create index if not exists idx_handoffs_status on handoffs(status);
