import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPlanById, calculateReturns } from "@/lib/investment-plans";
import { addDays } from "date-fns";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const investments = await prisma.investment.findMany({
    where: { userId: session.user.id },
    include: { transactions: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ investments });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { planId, amount, transactionId } = await req.json();

  const plan = getPlanById(planId);
  if (!plan) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  if (amount < plan.minAmount) {
    return NextResponse.json({ error: `Minimum investment is $${plan.minAmount}` }, { status: 400 });
  }

  if (plan.maxAmount && amount > plan.maxAmount) {
    return NextResponse.json({ error: `Maximum investment is $${plan.maxAmount}` }, { status: 400 });
  }

  const investment = await prisma.investment.create({
    data: {
      userId: session.user.id,
      planId,
      planName: plan.name,
      amount,
      returnRate: plan.returnRate,
      startDate: new Date(),
      endDate: addDays(new Date(), plan.duration),
      nextPayout: addDays(new Date(), plan.payoutDays),
      status: "active",
      transactions: {
        create: {
          userId: session.user.id,
          type: "deposit",
          amount,
          status: "completed",
          stripeId: transactionId || null,
          description: `Investment in ${plan.name} plan`,
        },
      },
    },
  });

  return NextResponse.json({ investment }, { status: 201 });
}
