export interface InvestmentPlan {
  id: string;
  name: string;
  tier: number;
  minAmount: number;
  maxAmount: number | null;
  returnRate: number;
  payoutFrequency: string;
  payoutDays: number;
  duration: number;
  features: string[];
  color: string;
  badge?: string;
  popular?: boolean;
}

export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tier: 1,
    minAmount: 500,
    maxAmount: 4999,
    returnRate: 8,
    payoutFrequency: "Monthly",
    payoutDays: 30,
    duration: 90,
    features: [
      "8% Annual Return",
      "Monthly Payouts",
      "Basic Portfolio Dashboard",
      "Email Support",
      "Quarterly Reports",
    ],
    color: "from-slate-400 to-slate-600",
  },
  {
    id: "silver",
    name: "Silver",
    tier: 2,
    minAmount: 5000,
    maxAmount: 24999,
    returnRate: 12,
    payoutFrequency: "Monthly",
    payoutDays: 30,
    duration: 90,
    features: [
      "12% Annual Return",
      "Monthly Payouts",
      "Advanced Portfolio Dashboard",
      "Priority Email Support",
      "Monthly Reports",
      "Market Insights Newsletter",
    ],
    color: "from-gray-300 to-gray-500",
  },
  {
    id: "gold",
    name: "Gold",
    tier: 3,
    minAmount: 25000,
    maxAmount: 99999,
    returnRate: 18,
    payoutFrequency: "Bi-Weekly",
    payoutDays: 14,
    duration: 180,
    features: [
      "18% Annual Return",
      "Bi-Weekly Payouts",
      "Premium Portfolio Dashboard",
      "Dedicated Account Manager",
      "Weekly Reports",
      "Exclusive Market Research",
      "Tax Optimization Guidance",
    ],
    color: "from-yellow-400 to-amber-600",
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "platinum",
    name: "Platinum",
    tier: 4,
    minAmount: 100000,
    maxAmount: 499999,
    returnRate: 25,
    payoutFrequency: "Weekly",
    payoutDays: 7,
    duration: 365,
    features: [
      "25% Annual Return",
      "Weekly Payouts",
      "Elite Portfolio Dashboard",
      "Private Wealth Advisor",
      "Daily Market Briefings",
      "VIP Research Access",
      "Tax & Estate Planning",
      "Concierge Services",
    ],
    color: "from-blue-400 to-indigo-700",
  },
  {
    id: "diamond",
    name: "Diamond",
    tier: 5,
    minAmount: 500000,
    maxAmount: null,
    returnRate: 35,
    payoutFrequency: "Daily",
    payoutDays: 1,
    duration: 365,
    features: [
      "35% Annual Return",
      "Daily Payouts",
      "White-Glove Portfolio Management",
      "C-Suite Investment Team",
      "Real-Time Analytics",
      "Institutional Research",
      "Full Tax & Legal Support",
      "Family Office Services",
      "Private Events Access",
    ],
    color: "from-cyan-400 to-blue-600",
    badge: "Elite",
  },
];

export function getPlanById(id: string): InvestmentPlan | undefined {
  return INVESTMENT_PLANS.find((p) => p.id === id);
}

export function calculateReturns(amount: number, ratePercent: number, days: number): number {
  const dailyRate = ratePercent / 100 / 365;
  return amount * dailyRate * days;
}
