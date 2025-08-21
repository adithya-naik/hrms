import { PrismaClient, LeaveType } from "@prisma/client"; // 👈 import LeaveType enum

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // Step 1: Create Leave Policies (use enums, not strings)
  const policiesData = [
    { leaveType: LeaveType.SICK, annualQuota: 12, maxConsecutiveDays: 5, minDaysNotice: 0, requiresApproval: true, requiresDocument: true, carryForwardAllowed: false },
    { leaveType: LeaveType.CASUAL, annualQuota: 15, maxConsecutiveDays: 3, minDaysNotice: 1, requiresApproval: true, requiresDocument: false, carryForwardAllowed: true, maxCarryForward: 4 },
    { leaveType: LeaveType.VACATION, annualQuota: 20, maxConsecutiveDays: 10, minDaysNotice: 7, requiresApproval: true, requiresDocument: false, carryForwardAllowed: true, maxCarryForward: 10 },
    { leaveType: LeaveType.ACADEMIC, annualQuota: 5, maxConsecutiveDays: 2, minDaysNotice: 3, requiresApproval: true, requiresDocument: true, carryForwardAllowed: false },
    { leaveType: LeaveType.COMP_OFF, annualQuota: 12, maxConsecutiveDays: 2, minDaysNotice: 1, requiresApproval: true, requiresDocument: false, carryForwardAllowed: true, maxCarryForward: 16 },
    { leaveType: LeaveType.WFH, annualQuota: 50, maxConsecutiveDays: 5, minDaysNotice: 1, requiresApproval: true, requiresDocument: false, carryForwardAllowed: false },
  ];

  const leavePolicies = [];
  for (const policy of policiesData) {
    const leavePolicy = await prisma.leavePolicy.upsert({
      where: { leaveType: policy.leaveType },
      update: {},
      create: policy,
    });
    leavePolicies.push(leavePolicy);
  }

  console.log("✅ Leave policies seeded");

  // Step 2: Fetch existing users
  const users = await prisma.user.findMany();
  const currentYear = new Date().getFullYear();

  // Step 3: Create LeaveBalances
  for (const user of users) {
    for (const policy of leavePolicies) {
      await prisma.leaveBalance.upsert({
        where: {
          userId_leavePolicyId_year: {
            userId: user.id,
            leavePolicyId: policy.id,
            year: currentYear,
          },
        },
        update: {},
        create: {
          userId: user.id,
          leavePolicyId: policy.id,
          year: currentYear,
          totalQuota: policy.annualQuota,
          availableDays: policy.annualQuota,
        },
      });
    }
  }

  console.log("✅ Leave balances seeded for all users");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🌱 Seeding completed successfully!");
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
