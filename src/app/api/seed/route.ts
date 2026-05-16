import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  return runSeed();
}

export async function POST() {
  return runSeed();
}

async function runSeed() {
  try {
    const hashed = await bcrypt.hash("demo1234", 12);

    const demo = await prisma.user.upsert({
      where: { email: "demo@nexvest.com" },
      update: { password: hashed },
      create: {
        name: "Alex Johnson",
        email: "demo@nexvest.com",
        password: hashed,
        country: "United States",
        phone: "+1 (555) 000-0001",
      },
    });

    const inv = await prisma.investment.upsert({
      where: { id: "demo-investment-1" },
      update: {},
      create: {
        id: "demo-investment-1",
        userId: demo.id,
        planId: "gold",
        planName: "Gold",
        amount: 50000,
        returnRate: 18,
        status: "active",
        totalEarned: 3750,
        startDate: new Date("2024-10-01"),
        endDate: new Date("2025-04-01"),
        nextPayout: new Date("2024-12-15"),
      },
    });

    for (const tx of [
      { id: "tx-demo-1", type: "deposit", amount: 50000, description: "Initial Gold Plan investment", createdAt: new Date("2024-10-01") },
      { id: "tx-demo-2", type: "payout", amount: 1875, description: "Bi-weekly payout — Gold Plan", createdAt: new Date("2024-11-01") },
      { id: "tx-demo-3", type: "payout", amount: 1875, description: "Bi-weekly payout — Gold Plan", createdAt: new Date("2024-11-15") },
    ]) {
      await prisma.transaction.upsert({
        where: { id: tx.id },
        update: {},
        create: { ...tx, userId: demo.id, investmentId: inv.id, status: "completed" },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Demo data ready. Login with demo@nexvest.com / demo1234",
      demoUserId: demo.id,
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
