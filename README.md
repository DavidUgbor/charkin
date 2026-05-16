# NexVest Capital — Investment Platform

A full-stack premium investment platform: Next.js 16 + TypeScript + Tailwind + Prisma + Postgres + NextAuth + Stripe-ready.

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDavidUgbor%2Fcharkin&project-name=nexvest-capital&repository-name=nexvest-capital&env=NEXTAUTH_SECRET&envDescription=Random%20secret%20-%20generate%20with%20%60openssl%20rand%20-base64%2032%60)

**Steps after clicking deploy:**

1. **First deploy** — Sign in with GitHub, set `NEXTAUTH_SECRET` (any 32+ char random string), click Deploy. The build will succeed but warn that DATABASE_URL is missing — the landing page works, login/dashboard won't yet.

2. **Add Postgres** — In your new Vercel project: **Storage** tab → **Create Database** → **Neon (Postgres)** → Free tier → Click Connect. Vercel auto-injects `DATABASE_URL` into your project.

3. **Redeploy** — **Deployments** tab → click **⋯** on the latest deploy → **Redeploy**. This time the build runs `prisma db push` + seeds the demo data.

4. **Done** — Visit your `https://*.vercel.app` URL. Log in with **`demo@nexvest.com` / `demo1234`** or register a new account.

## 💻 Run Locally

Requires Node 20+ and a Postgres URL (free at [neon.tech](https://neon.tech) or [supabase.com](https://supabase.com)).

```bash
git clone <repo>
cd charkin
cp .env.example .env          # paste your DATABASE_URL + a NEXTAUTH_SECRET
npm install                   # auto-runs `prisma generate`
npm run db:push               # creates tables
npm run db:seed               # creates demo@nexvest.com / demo1234
npm run dev                   # http://localhost:3000
```

## What's Built

**Landing page** — hero with animated AUM counter, about timeline, 5 investment tiers with returns calculator, how-it-works flow, video testimonials with modal player, CTA, footer.

**Auth** — register/login with NextAuth credentials provider, bcrypt password hashing, JWT sessions, password-strength meter.

**Investment tiers**
| Plan | Min | Annual Return | Payout |
|---|---|---|---|
| Starter | $500 | 8% | Monthly |
| Silver | $5K | 12% | Monthly |
| Gold | $25K | 18% | Bi-Weekly |
| Platinum | $100K | 25% | Weekly |
| Diamond | $500K | 35% | Daily |

**Investor dashboard** — portfolio stats, active investments, recent transactions, quick actions, sidebar nav.

**4-step invest flow** — choose plan → set amount with live calculator → payment method (Card / Bank Transfer / Wire) → confirm. Writes a real Investment + Transaction to the DB.

## Tech

Next.js 16 (App Router) · TypeScript · Tailwind · Prisma 7 · PostgreSQL · NextAuth · lucide-react · react-hot-toast · Stripe-ready

## Project Structure

```
src/
├── app/                        # App router pages + API routes
│   ├── (providers)/            # SessionProvider + Toaster
│   ├── api/{auth,register,investments,dashboard,payments}/
│   ├── login/  register/  dashboard/  invest/
│   └── page.tsx                # landing
├── components/
│   ├── landing/                # Hero, About, Plans, HowItWorks, Testimonials, CTA
│   ├── ui/                     # Button, Input, Card, Badge
│   ├── Navbar.tsx  Footer.tsx
├── lib/                        # prisma, auth, investment-plans, utils
└── types/                      # next-auth.d.ts
prisma/
├── schema.prisma
└── seed.ts                     # demo user + sample $50K Gold investment
```
