import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashed = await bcrypt.hash("demo1234", 12);

  const demo = await prisma.user.upsert({
    where: { email: "demo@nexvest.com" },
    update: {},
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

  await prisma.transaction.createMany({
    data: [
      {
        id: "tx-demo-1",
        userId: demo.id,
        investmentId: inv.id,
        type: "deposit",
        amount: 50000,
        status: "completed",
        description: "Initial Gold Plan investment",
        createdAt: new Date("2024-10-01"),
      },
      {
        id: "tx-demo-2",
        userId: demo.id,
        investmentId: inv.id,
        type: "payout",
        amount: 1875,
        status: "completed",
        description: "Bi-weekly payout — Gold Plan",
        createdAt: new Date("2024-11-01"),
      },
      {
        id: "tx-demo-3",
        userId: demo.id,
        investmentId: inv.id,
        type: "payout",
        amount: 1875,
        status: "completed",
        description: "Bi-weekly payout — Gold Plan",
        createdAt: new Date("2024-11-15"),
      },
    ],
  });

  console.log("Seed complete. Demo user: demo@nexvest.com / demo1234");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
