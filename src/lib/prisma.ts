import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function pickConnectionString(): string | null {
  return (
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    null
  );
}

function createPrismaClient(): PrismaClient {
  const connectionString = pickConnectionString();
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. In Vercel: Storage tab → Create Postgres → Connect → Redeploy."
    );
  }
  // Neon's WebSocket adapter for serverless (Vercel, etc.).
  // Falls back to standard pg for local/non-Neon Postgres URLs.
  const isNeon = /neon\.tech|vercel-storage\.com|pooler/i.test(connectionString);
  const adapter = isNeon
    ? new PrismaNeon({ connectionString })
    : new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient();
    }
    const client = globalForPrisma.prisma as unknown as Record<string | symbol, unknown>;
    const val = client[prop as string];
    return typeof val === "function" ? val.bind(globalForPrisma.prisma) : val;
  },
});
