import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 15;
export const dynamic = "force-dynamic";

export async function GET() {
  const status: {
    timestamp: string;
    env: {
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      VERCEL_URL: string;
    };
    database: { connected: boolean; error: string | null };
    demoUser: { exists: boolean; error: string | null };
    totalUsers: number | null;
  } = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "missing",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "set" : "missing",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "(unset — Vercel auto-detects)",
      VERCEL_URL: process.env.VERCEL_URL || "(unset)",
    },
    database: { connected: false, error: null },
    demoUser: { exists: false, error: null },
    totalUsers: null,
  };

  try {
    const count = await prisma.user.count();
    status.database.connected = true;
    status.totalUsers = count;
  } catch (e) {
    status.database.error = e instanceof Error ? e.message : String(e);
    return NextResponse.json(status, { status: 500 });
  }

  try {
    const demo = await prisma.user.findUnique({ where: { email: "demo@nexvest.com" } });
    status.demoUser.exists = !!demo;
  } catch (e) {
    status.demoUser.error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(status);
}
