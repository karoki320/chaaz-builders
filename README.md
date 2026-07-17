# Chaaz Builders

Hardware & building materials e-commerce site. Next.js (App Router) + Supabase + Vercel, M-Pesa payments via Safaricom's Daraja API directly (no third-party processor).

This is a from-scratch rebuild. The previous version of this project was built on the Manus platform (Express + MySQL + Manus OAuth) and could not run on Vercel/Supabase without a full rewrite, so it was replaced with this stack instead.

## Stack

- **Frontend/API:** Next.js 15, App Router, Tailwind CSS
- **Database/Auth:** Supabase (Postgres, Row Level Security, Supabase Auth for admin login)
- **Payments:** Safaricom Daraja API (M-Pesa STK Push), called directly - no IntaSend or other processor
- **Hosting:** Vercel

## Project structure

```
app/(store)/      customer-facing pages: home, shop, product, cart, checkout, contact
app/(admin)/admin  admin portal: dashboard, products, orders (protected by middleware.ts)
app/api/           checkout, contact, M-Pesa callback, admin product/order actions
lib/               supabase clients, mpesa.ts (Daraja), whatsapp.ts, utils.ts
supabase/migrations/  Postgres schema (001_init.sql) + starter categories (002_seed.sql)
```

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and run `supabase/migrations/001_init.sql`, then `002_seed.sql`.
3. Go to **Project Settings → API** and copy: Project URL, `anon` public key, `service_role` key.
4. Go to **Authentication → Users** and create your first admin user (email + password).
5. In **SQL Editor**, run this to make that user an admin (replace the email):
   ```sql
   insert into admins (id, email)
   select id, email from auth.users where email = 'you@example.com';
   ```

## 2. Set up Safaricom Daraja (M-Pesa)

1. Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke) and create an app under **My Apps** to get a sandbox Consumer Key/Secret.
2. For testing, use the shared sandbox shortcode `174379` and the sandbox passkey from Safaricom's docs.
3. For production, apply for a Paybill/Till shortcode and go-live approval from Safaricom - this takes longer than IntaSend's instant KYC, budget a few days.
4. Set `MPESA_CALLBACK_URL` to `https://yourdomain.com/api/payments/mpesa/callback` once deployed (Daraja requires a public HTTPS URL, so this only works after the first Vercel deploy).

## 3. Environment variables

Copy `.env.example` to `.env.local` for local dev, and add the same variables in **Vercel → Project Settings → Environment Variables** for production.

## 4. Local development

```
npm install
npm run dev
```

## 5. Deploy

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add all env vars from `.env.example`.
4. Deploy, then update `MPESA_CALLBACK_URL` to the live domain and redeploy.
5. Point your domain's DNS at Vercel.

## What's built vs. what's left

Done: storefront (home, shop with category filter, product detail, cart, checkout with M-Pesa STK push), order confirmation, contact form, admin login (Supabase Auth), admin dashboard, admin product creation, admin order status updates.

Still to do, in rough priority order:
- Product edit/delete in admin (currently create-only)
- Customer-facing order lookup by phone number
- Image upload for products (Supabase Storage) - currently emoji icons as placeholders
- Reconcile M-Pesa callback by `CheckoutRequestID` instead of relying on `AccountReference` alone (Daraja's callback shape needs a live sandbox test to confirm exact field names)
- Resend (or similar) for order confirmation emails
- Responsive/accessibility pass, SEO metadata per page, sitemap/robots.txt
- Rate limiting on `/api/checkout` and `/api/contact`
"# chaaz" 
"# chaaz-builders" 
