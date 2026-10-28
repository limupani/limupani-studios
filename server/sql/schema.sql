-- ============================================================================
-- DATABASE SCHEMA — safe to run more than once.
-- Run with:  npm run db:setup   (or paste into Supabase's SQL Editor)
-- ============================================================================

create table if not exists products (
  id          serial primary key,
  name        text        not null,                       -- "Brown's Blanket"
  type        text        not null,                       -- "Matte Sticker"
  category    text        not null,                       -- stickers | keychains | prints
  price       integer     not null check (price >= 0),    -- whole PKR
  image_url   text        not null,                       -- link to the picture
  stock       integer     not null default 0 check (stock >= 0),
  active      boolean     not null default true,          -- false = hidden from the shop
  sort_order  integer     not null default 0,             -- lower numbers show first
  created_at  timestamptz not null default now()
);

create index if not exists products_category_idx on products (category) where active;

-- SECURITY: Supabase exposes every table in the "public" schema through a public
-- web API unless Row Level Security is on. With it on and no policies, that API
-- can't read or change this table. Our Express server connects directly as the
-- database owner, which is not affected by this.
alter table products enable row level security;
