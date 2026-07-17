-- Chaaz Builders schema (Postgres / Supabase)

create table if not exists categories (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique,
  icon text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique,
  category_id bigint references categories(id) on delete set null,
  price numeric(10,2) not null,
  stock integer not null default 0,
  description text,
  icon text,
  images jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  installation_available boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_category_idx on products(category_id);
create index if not exists products_featured_idx on products(featured);

create table if not exists customers (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text,
  address text,
  created_at timestamptz not null default now()
);
create index if not exists customers_phone_idx on customers(phone);

create table if not exists orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  customer_id bigint references customers(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','confirmed','delivered','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid','failed')),
  payment_method text not null default 'mpesa',
  payment_reference text,
  subtotal numeric(10,2) not null,
  delivery_fee numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  delivery_address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_id bigint references products(id) on delete set null,
  product_name text not null,
  quantity integer not null,
  unit_price numeric(10,2) not null,
  created_at timestamptz not null default now()
);
create index if not exists order_items_order_idx on order_items(order_id);

create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Admins: linked to Supabase Auth users. Role check happens against this table.
create table if not exists admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Row Level Security: storefront reads are public, writes go through
-- server-side routes using the service role key, so RLS stays strict.
alter table categories enable row level security;
alter table products enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table contact_messages enable row level security;
alter table admins enable row level security;

create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);

-- No public policies on customers/orders/order_items/contact_messages/admins:
-- all access to those goes through server-side code using the service role key.
