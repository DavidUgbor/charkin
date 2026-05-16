import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [investments, transactions, user] = await Promise.all([
    prisma.investment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.transaction.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.user.findUnique({ where: { id: session.user.id } }),
  ]);

  const totalInvested = investments.reduce((s, i) => s + i.amount, 0);
  const totalEarned = investments.reduce((s, i) => s + i.totalEarned, 0);
  const activeInvestments = investments.filter((i) => i.status === "active").length;

  return NextResponse.json({
    user,
    stats: { totalInvested, totalEarned, activeInvestments, portfolioValue: totalInvested + totalEarned },
    investments,
    transactions,
  });
}
