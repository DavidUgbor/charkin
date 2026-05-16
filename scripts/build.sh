#!/usr/bin/env bash
set -e

echo "→ Generating Prisma Client"
npx prisma generate

if [ -z "$DATABASE_URL" ] || [[ "$DATABASE_URL" != postgres* ]]; then
  echo ""
  echo "⚠️  DATABASE_URL is not set to a PostgreSQL URL — skipping schema sync and seed."
  echo "   The app will deploy, but database-backed features won't work until you:"
  echo "   1. Go to your Vercel project → Storage → Create Postgres database"
  echo "   2. Vercel auto-injects DATABASE_URL"
  echo "   3. Trigger a redeploy (Deployments → ⋯ → Redeploy)"
  echo ""
else
  echo "→ Pushing Prisma schema to PostgreSQL"
  npx prisma db push --accept-data-loss --skip-generate

  echo "→ Seeding database (idempotent)"
  npx tsx prisma/seed.ts || echo "   Seed skipped or already applied"
fi

echo "→ Building Next.js"
npx next build
