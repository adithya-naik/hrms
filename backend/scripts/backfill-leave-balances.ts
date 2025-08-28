// scripts/backfill-leave-balances.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // JS months are 0-indexed
  const resetDate = new Date(now.getFullYear(), currentMonth, 1); // first day of next month

  const result = await prisma.leaveBalance.updateMany({
    data: {
      month: currentMonth,
      resetDate: resetDate,
    },
  });

  console.log(`✅ Updated ${result.count} leave balances to month ${currentMonth}`);
}

main()
  .then(() => {
    console.log("🎉 Backfill completed successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error backfilling leave balances:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
